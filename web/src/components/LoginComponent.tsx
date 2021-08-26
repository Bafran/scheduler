import { Button } from "@material-ui/core";
import { Form, Formik } from "formik";
import React from "react";
import { Redirect } from "react-router";
import { useLoginMutation, useMeQuery } from "../generated/graphql";
import { InputField } from "./InputField";
import { useHistory } from "react-router-dom";

interface LoginComponentProps {}

export const LoginComponent: React.FC<LoginComponentProps> = () => {
  const history = useHistory();
  const [login] = useLoginMutation();

  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(async () => {
            await login({
              variables: values,
            });
            setSubmitting(false);
            history.push("/home");
          }, 400);
        }}
      >
        {({
          isSubmitting,
          /* and other goodies */
        }) => (
          <Form>
            <InputField type="email" name="email" label="email" />
            <InputField type="password" name="password" label="password" />
            <br />
            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};
