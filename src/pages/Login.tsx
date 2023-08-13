import styled from "styled-components";
import { Link } from "react-router-dom";
import Form from "../components/Form";
import InputWithLabel from "../components/InputWithLabel";
import FormErrorMsg from "../components/FormErrorMsg";

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const onSubmit = (data: LoginForm) => console.log(data);

  return (
    <Wrapper>
      <Title>로그인</Title>
      <Form<LoginForm> onSubmit={onSubmit}>
        {({ register, formState: { errors, isValid } }) => (
          <>
            <InputWithLabel
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
            {errors?.email && <FormErrorMsg msg={errors?.email.message} />}
            <InputWithLabel
              label="비밀번호"
              type="password"
              placeholder="비밀번호를 입력해주세요."
              {...register("password", {
                required: "비밀번호를 입력해주세요.",
              })}
            />
            {errors?.password && (
              <FormErrorMsg msg={errors?.password.message} />
            )}
            <InputWithLabel type="submit" value="로그인" disabled={!isValid} />
          </>
        )}
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
  padding: 8px;
  font-size: 14px;
  opacity: ${({ $disabled }) => $disabled && 0.3};
  cursor: ${({ $disabled }) => $disabled && "not-allowed"};
`;
