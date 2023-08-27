import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { gql, useApolloClient, useMutation } from "@apollo/client";
import { Category } from "../../__generated__/graphql";
import { EditChannelMutation } from "../../__generated__/graphql";
import { EditChannelMutationVariables } from "../../__generated__/graphql";
import ChannelNavBar from "../../components/ChannelNavBar";
import Container from "../../components/Container";
import SubContainer from "../../components/SubContainer";
import Form from "../../components/Form";
import Label from "../../components/Label";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import DefaultThumbnailImage from "../../assets/images/thumbnail.png";
import FormErrorMsg from "../../components/FormErrorMsg";

interface EditChannelForm {
  name: string;
  description: string;
  photo: any;
}

const EDIT_CHANNEL_MUTATION = gql`
  mutation editChannel($editChannelInput: EditChannelInput!) {
    editChannel(input: $editChannelInput) {
      ok
      error
    }
  }
`;

interface MyChannelProps {
  name: string;
  description: string;
  photo: string;
  category: Category;
}

export const categoryList = Object.values(Category);

const MyChannel = ({
  name,
  description,
  photo: initialPhoto,
  category: initialCategory,
}: MyChannelProps) => {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [preview, setPreview] = useState(initialPhoto || DefaultThumbnailImage);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid },
    resetField,
  } = useForm<EditChannelForm>({
    mode: "onChange",
    defaultValues: {
      name,
      description,
    },
  });

  const navigate = useNavigate();

  const client = useApolloClient();

  const onCompleted = async (data: EditChannelMutation) => {
    const {
      editChannel: { ok },
    } = data;

    if (ok) {
      await client.refetchQueries({ include: "all" });
      navigate("/");
    }
  };

  const [editChannel, { loading: isMutationLoading }] = useMutation<
    EditChannelMutation,
    EditChannelMutationVariables
  >(EDIT_CHANNEL_MUTATION, { onCompleted });

  const onValidSubmit = async (data: EditChannelForm) => {
    if (isMutationLoading) return;

    const { name, description, photo } = data;

    let photoUrl;

    if (photo) {
      const formBody = new FormData();
      formBody.append("file", photo[0]);
      formBody.append("folderName", "channel");

      const { url } = await (
        await fetch(
          "https://asmroom-backend-b73cde5014a8.herokuapp.com/upload/",
          {
            method: "POST",
            body: formBody,
          }
        )
      ).json();

      photoUrl = url;
    }

    editChannel({
      variables: {
        editChannelInput: {
          name,
          description,
          photo: photo ? photoUrl : "",
          category: selectedCategory,
        },
      },
    });
  };

  const photoInput = watch("photo");

  useEffect(() => {
    if (!photoInput) return;
    if (photoInput.length <= 0) return;

    const file = photoInput[0];
    if (file.size > 1000000) return;

    setPreview(URL.createObjectURL(file));
  }, [photoInput]);

  const onClearFile = () => {
    resetField("photo");
    setPreview(DefaultThumbnailImage);
  };

  return (
    <Container>
      <ChannelNavBar />
      <SubContainer>
        <Form onSubmit={handleSubmit(onValidSubmit)}>
          <Input
            label="채널명"
            placeholder="2~20자 이내로 입력해주세요."
            {...register("name", {
              required: "채널명을 입력해주세요.",
              minLength: {
                value: 2,
                message: "채널명을 2~20자 이내로 입력해주세요.",
              },
              maxLength: {
                value: 20,
                message: "채널명을 2~20자 이내로 입력해주세요.",
              },
            })}
          />
          {errors?.name && <FormErrorMsg msg={String(errors.name.message)} />}

          <Label>썸네일</Label>
          <ThumbnailContainer>
            <Thumbnail src={preview} />
            <ThumbnailButtonContainer>
              <ThumbnailUpload
                type="file"
                id="photo"
                accept="image/*"
                hidden
                {...register("photo", {
                  required: false,
                  validate: {
                    lessThan10MB: (files) => {
                      if (!files) return true;
                      if (files.length === 0) return true;
                      if (files[0].size <= 1000000) return true;

                      resetField("photo");
                      return "1MB 이하 파일만 등록할 수 있습니다.";
                    },
                  },
                })}
              />
              <ThumbnailButton htmlFor="photo">등록</ThumbnailButton>
              <ThumbnailButton onClick={onClearFile}>삭제</ThumbnailButton>
            </ThumbnailButtonContainer>
          </ThumbnailContainer>
          {errors?.photo && <FormErrorMsg msg={String(errors.photo.message)} />}

          <Label>카테고리</Label>
          <CategoryContainer>
            {categoryList.map((category) => (
              <CategoryItem
                key={category}
                selected={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </CategoryItem>
            ))}
          </CategoryContainer>

          <Textarea
            label="소개글"
            placeholder="500자 이내로 입력해주세요."
            {...register("description", {
              maxLength: {
                value: 500,
                message: "소개글을 500자 이내로 입력해주세요.",
              },
            })}
          />
          {errors?.description && (
            <FormErrorMsg msg={String(errors.description.message)} />
          )}

          <Input
            type="submit"
            value="수정하기"
            disabled={!isValid || isMutationLoading}
            marginTop="0px"
          />
        </Form>
      </SubContainer>
    </Container>
  );
};

export default MyChannel;

const ThumbnailContainer = styled.div`
  margin-bottom: 30px;
  position: relative;
  width: fit-content;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Thumbnail = styled.img`
  width: 100%;
  max-width: 300px;
  aspect-ratio: 16 / 9;
  object-fit: cover;
`;

const ThumbnailUpload = styled.input``;

const ThumbnailButton = styled.label`
  padding: 10px 20px;
  background: ${({ theme }) => theme.surface};
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
`;

const ThumbnailButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const CategoryContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 30px;
`;

const CategoryItem = styled.li<{ selected: boolean }>`
  padding: 10px 20px;
  background: ${({ selected, theme }) =>
    selected ? theme.primary : theme.surface};
  border-radius: 5px;
  cursor: pointer;

  &:focus-visible {
    border: none;
    outline: 1px solid ${({ theme }) => theme.white};
  }
`;
