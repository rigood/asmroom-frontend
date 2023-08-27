import styled from "styled-components";
import { useMe } from "../../hooks/useMe";
import Container from "../../components/Container";
import SubContainer from "../../components/SubContainer";
import Input from "../../components/Input";
import { useForm } from "react-hook-form";
import FormErrorMsg from "../../components/FormErrorMsg";
import { gql, useApolloClient, useMutation } from "@apollo/client";
import {
  ChangeEmailMutation,
  ChangePasswordMutation,
  EditProfileMutation,
  UserRole,
} from "../../__generated__/graphql";

interface NicknameForm {
  nickname: string;
}

interface EmailForm {
  email: string;
}

interface PasswordForm {
  password: string;
}

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile($editProfileInput: EditProfileInput!) {
    editProfile(input: $editProfileInput) {
      ok
      error
    }
  }
`;

const CHANGE_EMAIL_MUTATION = gql`
  mutation changeEmail($changeEmailInput: ChangeEmailInput!) {
    changeEmail(input: $changeEmailInput) {
      ok
      error
    }
  }
`;

const CHANGE_PASSWORD_MUTATION = gql`
  mutation changePassword($changePasswordInput: ChangePasswordInput!) {
    changePassword(input: $changePasswordInput) {
      ok
      error
    }
  }
`;

const MyProfile = () => {
  const { data: userData } = useMe(false);

  const client = useApolloClient();

  const updateQueries = async () => {
    await client.refetchQueries({ include: ["me"] });
  };

  const onEditProfileCompleted = (data: EditProfileMutation) => {
    const {
      editProfile: { error },
    } = data;

    if (error) {
      resetNickname();
      alert(error);
    } else {
      updateQueries();
    }
  };

  const onChangeEmailCompleted = (data: ChangeEmailMutation) => {
    const {
      changeEmail: { error },
    } = data;

    if (error) {
      resetEmail();
      alert(error);
    } else {
      updateQueries();
    }
  };

  const onChangePasswordCompleted = (data: ChangePasswordMutation) => {
    const {
      changePassword: { error },
    } = data;

    if (error) {
      resetPassword();
      alert(error);
    } else {
      updateQueries();
    }
  };

  const [editProfile, { loading: isEditProfileLoading }] =
    useMutation<EditProfileMutation>(EDIT_PROFILE_MUTATION, {
      onCompleted: onEditProfileCompleted,
    });

  const [changeEmail, { loading: isChangeEmailLoading }] =
    useMutation<ChangeEmailMutation>(CHANGE_EMAIL_MUTATION, {
      onCompleted: onChangeEmailCompleted,
    });

  const [changePassword, { loading: isChangePasswordLoading }] =
    useMutation<ChangePasswordMutation>(CHANGE_PASSWORD_MUTATION, {
      onCompleted: onChangePasswordCompleted,
    });

  const {
    register: registerNickname,
    formState: { errors: nicknameErrors, isValid: isNicknameValid },
    reset: resetNickname,
    handleSubmit: handleSubmitNickname,
  } = useForm<NicknameForm>({
    mode: "onChange",
    defaultValues: {
      nickname: userData?.me.nickname,
    },
  });

  const {
    register: registerEmail,
    formState: { errors: errorsEmail, isValid: isEmailValid },
    reset: resetEmail,

    handleSubmit: handleSubmitEmail,
  } = useForm<EmailForm>({
    mode: "onChange",
    defaultValues: {
      email: userData?.me.email,
    },
  });

  const {
    register: registerPassword,
    formState: { errors: errorsPassword, isValid: isPasswordValid },
    reset: resetPassword,

    handleSubmit: handleSubmitPassword,
  } = useForm<PasswordForm>({
    mode: "onChange",
  });

  const onSubmitNickname = ({ nickname }: NicknameForm) => {
    if (isEditProfileLoading) return;

    editProfile({
      variables: {
        editProfileInput: {
          nickname,
        },
      },
    });
  };

  const onSubmitEmail = ({ email }: EmailForm) => {
    if (isChangeEmailLoading) return;

    changeEmail({
      variables: {
        changeEmailInput: {
          email,
        },
      },
    });
  };

  const onSubmitPassword = ({ password }: PasswordForm) => {
    if (isChangePasswordLoading) return;

    changePassword({
      variables: {
        changePasswordInput: {
          password,
        },
      },
    });
  };

  return (
    <Container>
      <SubContainer paddingBlock="0px">
        <PageTitle>내 프로필</PageTitle>

        <Form onSubmit={handleSubmitNickname(onSubmitNickname)}>
          <Input
            label="닉네임"
            placeholder="변경할 닉네임을 입력해주세요."
            {...registerNickname("nickname", {
              required: "닉네임을 입력해주세요.",
              minLength: {
                value: 2,
                message: "닉네임을 2~20자 이내로 입력해주세요.",
              },
              maxLength: {
                value: 20,
                message: "닉네임을 2~20자 이내로 입력해주세요.",
              },
            })}
          />
          {userData?.me.role === UserRole.Artist && (
            <FormErrorMsg msg="채널명은 My Channel에서 변경해주세요." />
          )}
          {nicknameErrors?.nickname && (
            <FormErrorMsg msg={String(nicknameErrors.nickname.message)} />
          )}
          <Input
            type="submit"
            value="변경하기"
            marginTop="0px"
            disabled={!isNicknameValid || isEditProfileLoading}
          />
        </Form>

        <Form onSubmit={handleSubmitEmail(onSubmitEmail)}>
          <Input
            label="이메일"
            placeholder="변경할 이메일을 입력해주세요."
            {...registerEmail("email", {
              required: "이메일을 입력해주세요.",
              pattern: {
                value: /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/,
                message: "올바른 이메일 주소를 입력해주세요.",
              },
            })}
          />
          {errorsEmail?.email && (
            <FormErrorMsg msg={String(errorsEmail.email.message)} />
          )}
          <Input
            type="submit"
            value="변경하기"
            marginTop="0px"
            disabled={!isEmailValid || isChangeEmailLoading}
          />
        </Form>

        <Form onSubmit={handleSubmitPassword(onSubmitPassword)}>
          <Input
            type="password"
            label="비밀번호"
            placeholder="변경할 비밀번호를 입력해주세요."
            {...registerPassword("password", {
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
          {errorsPassword?.password && (
            <FormErrorMsg msg={String(errorsPassword.password.message)} />
          )}
          <Input
            type="submit"
            value="변경하기"
            marginTop="0px"
            disabled={!isPasswordValid || isChangePasswordLoading}
          />
        </Form>
      </SubContainer>
    </Container>
  );
};

export default MyProfile;

const PageTitle = styled.h2`
  font-family: "Pretendard600";
  font-size: 24px;
  margin-bottom: 30px;
`;

const Form = styled.form`
  padding: 16px;
`;
