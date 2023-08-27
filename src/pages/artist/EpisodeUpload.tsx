import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { gql, useApolloClient, useMutation } from "@apollo/client";
import Container from "../../components/Container";
import ChannelNavBar from "../../components/ChannelNavBar";
import SubContainer from "../../components/SubContainer";
import Input from "../../components/Input";
import FormErrorMsg from "../../components/FormErrorMsg";
import Textarea from "../../components/Textarea";
import YouTube from "react-youtube";
import Form from "../../components/Form";
import {
  CreateEpisodeMutation,
  CreateEpisodeMutationVariables,
} from "../../__generated__/graphql";
import { useMe } from "../../hooks/useMe";
import { MY_CHANNEL_QUERY } from "./MyChannelContainer";

interface uploadEpisodeForm {
  title: string;
  description: string;
  youtubeUrl: string;
}

const CREATE_EPISODE_MUTATION = gql`
  mutation createEpisode($createEpisodeInput: CreateEpisodeInput!) {
    createEpisode(input: $createEpisodeInput) {
      ok
      error
    }
  }
`;

const EpisodeUpload = () => {
  const { data: userData } = useMe(false);

  const [youtubeId, setYoutubeId] = useState("");

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<uploadEpisodeForm>({
    mode: "onChange",
  });

  const navigate = useNavigate();

  const client = useApolloClient();

  const onCompleted = async (data: CreateEpisodeMutation) => {
    const {
      createEpisode: { ok },
    } = data;

    if (ok) {
      navigate("/");
      await client.refetchQueries({ include: "active" });
    }
  };

  const [createEpisode, { loading: isMutationLoading }] = useMutation<
    CreateEpisodeMutation,
    CreateEpisodeMutationVariables
  >(CREATE_EPISODE_MUTATION, {
    onCompleted,
    refetchQueries: [{ query: MY_CHANNEL_QUERY }],
  });

  const onValidSubmit = (data: uploadEpisodeForm) => {
    if (isMutationLoading) return;

    const { title, description } = data;

    createEpisode({
      variables: {
        createEpisodeInput: {
          channelId: userData?.me.channelId!,
          title,
          description,
          youtubeId,
        },
      },
    });
  };

  const onYoutubePreviewStart = () => {
    const urlInput = watch("youtubeUrl");

    if (urlInput === "") {
      setYoutubeId("");
      return;
    }

    const regex =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;

    const match = urlInput.match(regex);

    if (match && match[7].length === 11) {
      setYoutubeId(match[7]);
    } else {
      setYoutubeId("");
    }
  };

  return (
    <Container>
      <ChannelNavBar />
      <SubContainer>
        <Form onSubmit={handleSubmit(onValidSubmit)}>
          <Input
            label="제목"
            placeholder="2~100자 이내로 입력해주세요."
            {...register("title", {
              required: "제목을 입력해주세요.",
              minLength: {
                value: 2,
                message: "제목을 2~100자 이내로 입력해주세요.",
              },
              maxLength: {
                value: 100,
                message: "제목을 2~100자 이내로 입력해주세요.",
              },
            })}
          />
          {errors?.title && <FormErrorMsg msg={String(errors.title.message)} />}

          <Textarea
            label="내용"
            placeholder="500자 이내로 입력해주세요."
            {...register("description", {
              maxLength: {
                value: 500,
                message: "내용을 500자 이내로 입력해주세요.",
              },
            })}
          />
          {errors?.description && (
            <FormErrorMsg msg={String(errors.description.message)} />
          )}

          <Input
            label="유튜브 URL"
            placeholder="유튜브 URL을 입력해주세요."
            {...register("youtubeUrl", {
              required: "유튜브 URL을 입력해주세요.",
              pattern: {
                value:
                  /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/,
                message: "올바른 유튜브 URL을 입력해주세요.",
              },
              onChange: onYoutubePreviewStart,
            })}
          />
          {errors?.youtubeUrl && (
            <FormErrorMsg msg={String(errors.youtubeUrl.message)} />
          )}
          <YouTube videoId={youtubeId} />

          <Input
            type="submit"
            value="등록하기"
            disabled={!isValid || isMutationLoading}
            marginTop="30px"
          />
        </Form>
      </SubContainer>
    </Container>
  );
};

export default EpisodeUpload;
