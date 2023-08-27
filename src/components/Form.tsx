import styled from "styled-components";

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export default Form;

// import React from "react";

// interface FormProps {
//   children: React.ReactNode;
//   onSubmit: React.FormEventHandler<HTMLFormElement>;
// }

// const Form = ({ children, onSubmit }: FormProps) => {
//   return <StyledForm onSubmit={onSubmit}>{children}</StyledForm>;
// };

// export default Form;

// const StyledForm = styled.form`
//   width: 100%;
//   display: flex;
//   flex-direction: column;
// `;
