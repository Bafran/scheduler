import { Button, Grid } from "@material-ui/core";
import { Formik, Form } from "formik";
import React from "react";
import { useHistory } from "react-router";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { useCompanyLoginMutation } from "../generated/graphql";

interface CompanyLoginProps {}

export const CompanyLogin: React.FC<CompanyLoginProps> = () => {
  const history = useHistory();
  const [login] = useCompanyLoginMutation();

  return (
    <Layout>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <Formik
          initialValues={{ companyName: "", password: "" }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(async () => {
              await login({
                variables: values,
              });
              setSubmitting(false);
              history.push("/companyhome");
            }, 400);
          }}
        >
          {({
            isSubmitting,
            /* and other goodies */
          }) => (
            <Form>
              <InputField name="companyName" label="company name" />
              <InputField type="password" name="password" label="password" />
              <br />
              <Button type="submit" disabled={isSubmitting}>
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Grid>
    </Layout>
  );
};

export default CompanyLogin;
