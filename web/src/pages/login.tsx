import { Grid } from "@material-ui/core";
import React from "react";
import { Layout } from "../components/Layout";
import { LoginComponent } from "../components/LoginComponent";

interface loginProps {}

const Login: React.FC<loginProps> = () => {
  return (
    <Layout>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={3}>
          <LoginComponent />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Login;
