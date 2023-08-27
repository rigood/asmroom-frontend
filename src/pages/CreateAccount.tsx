import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import {
  UserRole,
  CreateAccountMutation,
  CreateAccountMutationVariables,
} from "../__generated__/graphql";
import AppTitle from "../components/AppTitle";
import Form from "../components/Form";
import Input from "../components/Input";
import FormErrorMsg from "../components/FormErrorMsg";

interface CreateAccountForm {
  nickname: string;
  email: string;
  password: string;
  role: UserRole;
}

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`;

const CreateAccount = () => {
  const [isArtist, setIsArtist] = useState(false);
  const labelByIsArtist = isArtist ? "닉네임(채널명)" : "닉네임";

  const {
    register,
    formState: { errors, isValid },
    reset,
    handleSubmit,
  } = useForm<CreateAccountForm>({ mode: "onChange" });

  const onListenerSelect = () => {
    setIsArtist(false);
    reset();
  };

  const onArtistSelect = () => {
    setIsArtist(true);
    reset();
  };

  const navigate = useNavigate();

  const onCompleted = (data: CreateAccountMutation) => {
    const {
      createAccount: { ok, error },
    } = data;

    if (error) {
      reset();
      alert(error);
    }

    if (ok) {
      navigate("/login");
    }
  };

  const [createAccount, { loading: isMutationLoading }] = useMutation<
    CreateAccountMutation,
    CreateAccountMutationVariables
  >(CREATE_ACCOUNT_MUTATION, { onCompleted });

  const onValidSubmit = (data: CreateAccountForm) => {
    if (isMutationLoading) return;

    const { nickname, email, password } = data;

    createAccount({
      variables: {
        createAccountInput: {
          nickname,
          email,
          password,
          role: isArtist ? UserRole.Artist : UserRole.Listener,
        },
      },
    });
  };

  return (
    <Wrapper>
      <AppTitle />
      <Title>회원가입</Title>
      <Form onSubmit={handleSubmit(onValidSubmit)}>
        <>
          <UserRoleBox>
            <UserRoleItem
              selected={!isArtist}
              onClick={onListenerSelect}
              tabIndex={1}
            >
              일반회원
            </UserRoleItem>
            <UserRoleItem
              selected={isArtist}
              onClick={onArtistSelect}
              tabIndex={2}
            >
              아티스트
            </UserRoleItem>
          </UserRoleBox>
          <Input
            label={labelByIsArtist}
            placeholder="2~20자 이내로 입력해주세요."
            {...register("nickname", {
              required: `${labelByIsArtist}을 입력해주세요.`,
              minLength: {
                value: 2,
                message: `${labelByIsArtist} 2~20자 이내로 입력해주세요.`,
              },
              maxLength: {
                value: 20,
                message: `${labelByIsArtist} 2~20자 이내로 입력해주세요.`,
              },
            })}
          />
          {errors?.nickname && (
            <FormErrorMsg msg={String(errors.nickname.message)} />
          )}
          <Input
            label="이메일"
            type="email"
            placeholder="이메일을 입력해주세요."
            {...register("email", {
              required: "이메일을 입력해주세요.",
              pattern: {
                value: /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/,
                message: "올바른 이메일 주소를 입력해주세요.",
              },
            })}
          />
          {errors?.email && <FormErrorMsg msg={String(errors.email.message)} />}
          <Input
            label="비밀번호"
            type="password"
            placeholder="4~16자 이내로 입력해주세요."
            {...register("password", {
              required: "비밀번호를 입력해주세요.",
              minLength: {
                value: 4,
                message: "비밀번호를 4~16자 이내로 입력해주세요.",
              },
              maxLength: {
                value: 16,
                message: "비밀번호를 4~16자 이내로 입력해주세요.",
              },
            })}
          />
          {errors?.password && (
            <FormErrorMsg msg={String(errors.password?.message)} />
          )}
          <Input
            type="submit"
            value="가입하기"
            disabled={!isValid || isMutationLoading}
          />
          <SLink to="/login">&larr; 로그인</SLink>
        </>
      </Form>
    </Wrapper>
  );
};

export default CreateAccount;

const Wrapper = styled.div`
  width: 100%;
  max-width: 550px;
  margin: 0 auto;
  padding: 72px 16px 36px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  margin: 50px 0;
  text-align: center;
  font-family: "Pretendard600";
  font-size: 24px;
`;

const UserRoleBox = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
  margin-bottom: 40px;
`;

const UserRoleItem = styled.div<{ selected: boolean }>`
  flex: 1;
  padding: 16px;
  text-align: center;
  background: ${({ selected, theme }) =>
    selected ? theme.primary : theme.surface};
  border-radius: 10px;
  cursor: pointer;

  &:focus-visible {
    border: none;
    outline: 1px solid ${({ theme }) => theme.white};
  }
`;

const SLink = styled(Link)`
  width: fit-content;
  padding: 0 8px;
  font-size: 14px;
`;
