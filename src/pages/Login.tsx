import { Link, useLocation, useNavigate } from "react-router-dom";
import { gql, useApolloClient, useMutation } from "@apollo/client";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import {
  LoginMutation,
  LoginMutationVariables,
} from "../__generated__/graphql";
import { LOCALSTORAGE_TOKEN } from "../constants";
import { authTokenVar, isLoggedInVar } from "../apollo";
import Form from "../components/Form";
import InputWithLabel from "../components/InputWithLabel";
import FormErrorMsg from "../components/FormErrorMsg";

interface LoginForm {
  email: string;
  password: string;
}

const LOGIN_MUTATION = gql`
  mutation login($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      token
      error
    }
  }
`;

const Login = () => {
  const {
    register,
    formState: { errors, isValid },
    resetField,
    handleSubmit,
  } = useForm<LoginForm>({
    mode: "onChange",
    defaultValues: {},
  });

  const navigate = useNavigate();
  const location = useLocation();
  const fromPathname = location.state?.from?.pathname || "/";

  const client = useApolloClient();
  const onCompleted = (data: LoginMutation) => {
    const {
      login: { ok, token, error },
    } = data;

    if (error) {
      resetField("password");
      alert(error);
    }

    if (ok && token) {
      localStorage.setItem(LOCALSTORAGE_TOKEN, token);
      authTokenVar(token);
      isLoggedInVar(true);
      navigate(fromPathname, { replace: true });
      client.resetStore();
    }
  };

  const [login, { loading: isMutationLoading }] = useMutation<
    LoginMutation,
    LoginMutationVariables
  >(LOGIN_MUTATION, {
    onCompleted,
  });

  const onSubmit = handleSubmit((data: LoginForm) => {
    if (isMutationLoading) return;

    const { email, password } = data;
    login({
      variables: {
        loginInput: {
          email,
          password,
        },
      },
    });
  });

  return (
    <Wrapper>
      <Title>로그인</Title>
      <Form onSubmit={onSubmit}>
        <>
          <InputWithLabel
            label="이메일"
            type="email"
            placeholder="이메일을 입력해주세요."
            {...register("email", {
              required: true,
              pattern: {
                value: /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/,
                message: "올바른 이메일 주소를 입력해주세요.",
              },
            })}
          />
          {errors?.email && errors.email.type === "pattern" && (
            <FormErrorMsg msg={errors?.email.message} />
          )}
          <InputWithLabel
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            {...register("password", {
              required: true,
            })}
          />
          <InputWithLabel
            type="submit"
            value="로그인"
            disabled={!isValid || isMutationLoading}
          />
        </>
      </Form>
      <Footer>
        <SLink to="/create-account">회원가입</SLink>
        <SLink to="#" $disabled tabIndex={-1}>
          이메일 찾기(준비중)
        </SLink>
      </Footer>
    </Wrapper>
  );
};

export default Login;

const Wrapper = styled.div`
  width: 100%;
  max-width: 550px;
  margin: 0 auto;
  padding: 36px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  margin: 50px 0;
  text-align: center;
  font-family: "Pretendard600";
  font-size: 24px;
`;

const Footer = styled.footer`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const SLink = styled(Link)<{ $disabled?: boolean }>`
  width: fit-content;
  padding: 0 8px;
  font-size: 14px;
  opacity: ${({ $disabled }) => $disabled && 0.3};
  cursor: ${({ $disabled }) => $disabled && "default"};
`;
