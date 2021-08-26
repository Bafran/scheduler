import { Button, Grid, StepButton } from "@material-ui/core";
import { Form, Formik } from "formik";
import { validate } from "graphql";
import React, { useState } from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { useRegisterCompanyMutation } from "../generated/graphql";
import { useHistory } from "react-router";

interface CompanyRegisterProps {}

const CompanyRegister: React.FC<CompanyRegisterProps> = () => {
  const history = useHistory();

  const formData = {
    companyName: "",
    password: "",
    email: "",
  };

  const [register] = useRegisterCompanyMutation();

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
          enableReinitialize
          initialValues={{ ...formData }}
          onSubmit={async (values) => {
            await register({
              variables: { options: values },
            });
            history.push("/companyhome");
          }}
        >
          <Form>
            <InputField label="company name" name="companyName" />
            <br />
            <InputField type="email" label="email" name="email" />
            <InputField type="password" label="password" name="password" />{" "}
            <br />
            <Button type="submit">Submit</Button>
          </Form>
        </Formik>
      </Grid>
    </Layout>
  );
};

export default CompanyRegister;
