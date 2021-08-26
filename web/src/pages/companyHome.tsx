import {
  Box,
  Button,
  Grid,
  Input,
  Paper,
  Typography,
  Link,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import {
  useCreateDepartmentMutation,
  useFindEmployeeQuery,
  useGetCompanyDepartmentsQuery,
  useGiveTitleMutation,
  useMeCompanyQuery,
  useRegisterEmployeeMutation,
} from "../generated/graphql";

interface companyHomeProps {}

const CompanyHome: React.FC<companyHomeProps> = () => {
  const { data: meData } = useMeCompanyQuery();
  // Handle employee registration
  const [registerEmployee] = useRegisterEmployeeMutation();
  const [displayedPassword, setDisplayedPassword] = useState("");
  useEffect(() => {
    let passwordRes = document.getElementById("employeePassword");
    if (passwordRes && displayedPassword !== "") {
      passwordRes.innerHTML = `Your generated password is: ${displayedPassword}`;
    }
  });

  const employeeFormData = {
    firstName: "",
    lastName: "",
    password: "",
    email: "",
  };

  // Handle assigning employee a title
  const [giveTitle] = useGiveTitleMutation();
  const titleFormData = {
    email: "",
    title: "",
  };

  // Handle department fetching
  let compId = "0";
  if (meData?.meCompany) {
    compId = meData.meCompany.id;
  }
  const { data: departmentData, loading: departmentLoading } =
    useGetCompanyDepartmentsQuery({
      variables: { companyId: parseInt(compId) },
    });

  // Handle department registration
  const [createDepartment] = useCreateDepartmentMutation();
  const createDepartmentFormData = {
    departmentName: "",
    companyId: parseInt(compId),
  };

  if (compId === "0") {
    return <p>Not Authenticated</p>;
  }

  return (
    <Layout>
      <Grid container spacing={3} direction="row" justifyContent="space-evenly">
        {/* add a new employee */}
        <Grid item xs={4}>
          <Typography>Register a new employee</Typography>
          <Formik
            initialValues={{ ...employeeFormData }}
            onSubmit={async (values) => {
              //Generate a password for the employee and display it on screen
              let tmp = Math.random().toString(36).slice(-8);
              setDisplayedPassword(tmp);
              values.password = tmp;
              await registerEmployee({
                variables: { options: values },
              });
              alert(JSON.stringify(values, null, 2));
            }}
          >
            <Form>
              <InputField label="first name" name="firstName" />
              <InputField label="last name" name="lastName" />
              <InputField type="email" label="email" name="email" />
              <Button type="submit">Submit</Button>
            </Form>
          </Formik>
          <p id="employeePassword"></p>
        </Grid>
        {/* give employee manager title */}
        <Grid item xs={4}>
          <Typography>Give an employee a new title</Typography>
          <Formik
            initialValues={{ ...titleFormData }}
            onSubmit={async (values) => {
              const email = values.email;
              const title = values.title;
              giveTitle({
                variables: {
                  argument: email,
                  title: title,
                  findBy: "email",
                },
              });
              alert(JSON.stringify(values, null, 2));
            }}
          >
            <Form>
              <InputField type="email" label="email" name="email" />
              <InputField label="title" name="title" /> <br />
              <Button type="submit">Submit</Button>
            </Form>
          </Formik>
        </Grid>
        {/* department info */}
        <Grid item xs={4}>
          <Grid
            container
            spacing={3}
            direction="column"
            justifyContent="space-evenly"
          >
            {/* currently existing departments */}
            <Grid item xs={12}>
              <Typography>Currently Existing Departments</Typography>
              <div>
                {departmentData?.getCompanyDepartments.map((d) => {
                  return (
                    <Box my={1} maxWidth={425}>
                      <Paper>
                        <Typography>
                          <Link href={"/home/" + d.id} underline="none">
                            &emsp;{d.name[0].toUpperCase()}
                            {d.name.slice(1)} Department
                          </Link>
                        </Typography>
                      </Paper>
                    </Box>
                  );
                })}
              </div>
            </Grid>
            {/* create a new department */}
            <Grid item xs={12}>
              <Typography>Add a new Department</Typography>
              <Formik
                initialValues={{ ...createDepartmentFormData }}
                onSubmit={async (values, { resetForm }) => {
                  await createDepartment({
                    variables: {
                      ...values,
                    },
                  });
                  resetForm({ values: { ...createDepartmentFormData } });
                }}
              >
                <Form>
                  <InputField label="Department Name" name="departmentName" />
                  <br />
                  <Button type="submit">Submit</Button>
                </Form>
              </Formik>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default CompanyHome;
