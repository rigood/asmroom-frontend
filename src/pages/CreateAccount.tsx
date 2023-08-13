import { useState } from "react";
import styled from "styled-components";
import { UserRole } from "../__generated__/graphql";
import AppTitle from "../components/AppTitle";
import Form from "../components/Form";
import InputWithLabel from "../components/InputWithLabel";
import FormErrorMsg from "../components/FormErrorMsg";

interface CreateAccountForm {
  nickname: string;
  email: string;
  password: string;
  role?: UserRole;
}

const CreateAccount = () => {
  const [isArtist, setIsArtist] = useState(false);
  const onSubmit = (data: CreateAccountForm) => console.log(data);

  const labelByIsArtist = isArtist ? "채널명" : "닉네임";
  return (
    <Wrapper>
      <AppTitle />
      <Title>회원가입</Title>
      <Form<CreateAccountForm> onSubmit={onSubmit}>
        {({ register, formState: { errors, isValid }, reset }) => (
          <>
            <UserRoleBox>
              <UserRoleItem
                selected={!isArtist}
                onClick={() => {
                  setIsArtist(false);
                  reset();
                }}
                tabIndex={1}
              >
                일반회원
              </UserRoleItem>
              <UserRoleItem
                selected={isArtist}
                onClick={() => {
                  setIsArtist(true);
                  reset();
                }}
                tabIndex={2}
              >
                아티스트
              </UserRoleItem>
            </UserRoleBox>
            <InputWithLabel
              label={labelByIsArtist}
              placeholder="1~10자 이내로 입력해주세요."
              {...register("nickname", {
                required: `${labelByIsArtist}을 입력해주세요.`,
                minLength: {
                  value: 1,
                  message: `${labelByIsArtist}을 1~10자 이내로 입력해주세요.`,
                },
                maxLength: {
                  value: 10,
                  message: `${labelByIsArtist}을 1~10자 이내로 입력해주세요.`,
                },
              })}
            />
            {errors?.nickname && (
              <FormErrorMsg msg={errors?.nickname.message} />
            )}
            <InputWithLabel
              label="이메일"
              type="email"
              placeholder="인증 메일이 발송될 이메일을 입력해주세요."
              {...register("email", {
                required: "이메일을 입력해주세요.",
                pattern: {
                  value: /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/,
                  message: "올바른 이메일 주소를 입력해주세요.",
                },
              })}
            />
            {errors?.email && <FormErrorMsg msg={errors?.email.message} />}
            <InputWithLabel
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
              <FormErrorMsg msg={errors?.password.message} />
            )}

            <InputWithLabel
              type="submit"
              value="가입하기"
              disabled={!isValid}
            />
          </>
        )}
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
    selected ? theme.primary : theme.inputBgColor};
  border-radius: 10px;
  cursor: pointer;

  &:focus-visible {
    border: none;
    outline: 1px solid ${({ theme }) => theme.white};
  }
`;
