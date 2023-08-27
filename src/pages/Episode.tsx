import styled from "styled-components";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  gql,
  useApolloClient,
  useMutation,
  useReactiveVar,
} from "@apollo/client";
import Container from "../components/Container";
import { useEpisode } from "../hooks/useEpisode";
import YouTube from "react-youtube";
import DefaultThumbnailImage from "../assets/images/thumbnail.png";
import Textarea from "../components/Textarea";
import Input from "../components/Input";
import Select from "../components/Select";
import { useForm } from "react-hook-form";
import FormErrorMsg from "../components/FormErrorMsg";
import {
  CreateReviewMutation,
  CreateReviewMutationVariables,
  UserRole,
} from "../__generated__/graphql";
import { useMe } from "../hooks/useMe";
import { isLoggedInVar } from "../apollo";
import Reviews from "../components/Reviews";

interface CreateReviewForm {
  text: string;
  rating: number;
}

const CREATE_REVIEW_MUTATION = gql`
  mutation createReview($createReviewInput: CreateReviewInput!) {
    createReview(input: $createReviewInput) {
      ok
      error
    }
  }
`;

const Episode = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  const { data: userData } = useMe(!isLoggedIn);
  const isArtist = userData?.me.role === UserRole.Artist;

  const { episodeId } = useParams();

  const { data: episodeData } = useEpisode(+episodeId!);
  const episodeInfo = episodeData?.episode.episode;

  const naviate = useNavigate();

  useEffect(() => {
    if (!episodeId) {
      naviate("/");
    }
  }, [episodeId, naviate]);

  const {
    register,
    formState: { errors, isValid },
    reset,
    handleSubmit,
  } = useForm<CreateReviewForm>({ mode: "onChange" });

  const client = useApolloClient();

  const onCompleted = async (data: CreateReviewMutation) => {
    const {
      createReview: { ok, error },
    } = data;

    if (error) {
      alert(error);
    }

    if (ok) {
      reset();
      await client.refetchQueries({ include: "all" });
      alert("리뷰가 등록되었습니다 😀");
    }
  };

  const [createReview, { loading: isMutationLoading }] = useMutation<
    CreateReviewMutation,
    CreateReviewMutationVariables
  >(CREATE_REVIEW_MUTATION, { onCompleted });

  const onValidSubmit = (data: CreateReviewForm) => {
    if (isMutationLoading) return;

    const { text, rating } = data;

    createReview({
      variables: {
        createReviewInput: {
          episodeId: +episodeId!,
          text,
          rating: +rating,
        },
      },
    });
  };

  if (!episodeInfo) {
    return null;
  }

  return (
    <Container>
      <YouTubeWrapper>
        <YouTube videoId={episodeInfo.youtubeId} className="youtubeContainer" />
      </YouTubeWrapper>
      <EpisodeInfo>
        <div className="title">{episodeInfo.title}</div>
        <div className="createdAt">{episodeInfo.createdAt.substr(0, 10)}</div>
        <SLink to={`/channels/${episodeInfo.channel.id}`}>
          <img
            src={episodeInfo.channel.photo || DefaultThumbnailImage}
            alt={episodeInfo.channel.name}
          />
          <span>{episodeInfo.channel.name}</span>
        </SLink>
        <div className="description">{episodeInfo.description}</div>
      </EpisodeInfo>
      <ReviewForm onSubmit={handleSubmit(onValidSubmit)}>
        <Select
          label="🎧 리뷰"
          {...register("rating")}
          options={[
            { label: "⭐⭐⭐⭐⭐", value: 5 },
            { label: "⭐⭐⭐⭐", value: 4 },
            { label: "⭐⭐⭐", value: 3 },
            { label: "⭐⭐", value: 2 },
            { label: "⭐", value: 1 },
          ]}
        />
        <Textarea
          placeholder="ASMR 영상 어떠셨나요? 여러분의 후기는 큰 힘이 됩니다💛"
          {...register("text", {
            required: "후기 내용을 입력해주세요.",
            maxLength: {
              value: 500,
              message: "최대 500자 이내로 작성해주세요.",
            },
          })}
        />
        {!isLoggedIn && <FormErrorMsg msg="로그인 후 리뷰를 남길 수 있어요." />}
        {isArtist && <FormErrorMsg msg="Artist는 리뷰를 남길 수 없습니다." />}
        {isLoggedIn && !isArtist && errors?.text && (
          <FormErrorMsg msg={String(errors.text?.message)} />
        )}
        <Input
          type="submit"
          value="등록하기"
          marginTop="-10px"
          disabled={!isLoggedIn || isArtist || !isValid || isMutationLoading}
        />
      </ReviewForm>
      {episodeId && <Reviews episodeId={+episodeId} />}
    </Container>
  );
};

export default Episode;

const YouTubeWrapper = styled.div`
  .youtubeContainer {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%;
    overflow: hidden;
    margin-bottom: 50px;
  }

  .youtubeContainer iframe {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const EpisodeInfo = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;

  .title {
    font-family: "pretendard600";
    font-size: 24px;
  }

  .createdAt {
    font-size: 14px;
    color: ${({ theme }) => theme.textInvertedColor};
  }

  .description {
    padding: 16px;
    border-radius: 10px;
    background: ${({ theme }) => theme.surface};
    line-height: 1.5;
    color: ${({ theme }) => theme.textInvertedColor};
  }
`;

const SLink = styled(Link)`
  width: fit-content;
  display: flex;
  align-items: center;

  img {
    display: block;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
  }
`;

const ReviewForm = styled.form`
  margin: 30px 0;
  display: flex;
  flex-direction: column;
`;
