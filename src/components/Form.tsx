import React from "react";
import styled from "styled-components";
import {
  useForm,
  FieldValues,
  UseFormReturn,
  SubmitHandler,
} from "react-hook-form";

type FormProps<TFormValues extends FieldValues> = {
  onSubmit: SubmitHandler<TFormValues>;
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
};

const Form = <TFormValues extends FieldValues>({
  onSubmit,
  children,
}: FormProps<TFormValues>) => {
  const methods = useForm<TFormValues>({ mode: "onTouched" });
  return (
    <StyledForm onSubmit={methods.handleSubmit(onSubmit)}>
      {children(methods)}
    </StyledForm>
  );
};

export default Form;

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
