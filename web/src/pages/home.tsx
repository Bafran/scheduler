import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React from "react";
import { Layout } from "../components/Layout";
import { Wrapper } from "../components/Wrapper";
import { useGetShiftsQuery, useMeQuery } from "../generated/graphql";
import { useHistory, useParams } from "react-router-dom";

interface homeProps {}

const Home: React.FC<homeProps> = () => {
  const { data: meData } = useMeQuery();
  const history = useHistory();

  const params: any = useParams();
  console.log("Params id: " + params.id);

  let values;

  if (meData?.me?.departmentId) {
    values = {
      id: parseInt(meData.me.departmentId),
      dateTime: "August 19, 2021 07:15",
    };
  } else {
    console.log("here");
    values = {
      id: parseInt(params.id),
      dateTime: "August 19, 2021 07:15",
    };
  }

  const { data } = useGetShiftsQuery({ variables: values });

  if (!data) {
    return <div>No Shift Data to report</div>;
  }

  if(!meData?.me) {
    return <div>Not Authenticated</div>;
  }

  let weekdaysDict = {
    Mon: "",
    Tue: "",
    Wed: "",
    Thu: "",
    Fri: "",
    Sat: "",
    Sun: "",
  };

  return (
    <Layout>
      <Wrapper width="skinny">
        <TableContainer component={Paper}>
          <Table aria-label="Schedule">
            <TableHead>
              <TableRow>
                <TableCell align="left">Employee</TableCell>
                {/* Days of the week */}
                <TableCell align="right">Sunday&nbsp;</TableCell>
                <TableCell align="right">Monday&nbsp;</TableCell>
                <TableCell align="right">Tuesday&nbsp;</TableCell>
                <TableCell align="right">Wednesday&nbsp;</TableCell>
                <TableCell align="right">Thursday&nbsp;</TableCell>
                <TableCell align="right">Friday&nbsp;</TableCell>
                <TableCell align="right">Saturday&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.getShifts.map((employee) => {
                // Initialize this employee's week calender
                let calender = JSON.parse(JSON.stringify(weekdaysDict));

                employee.shifts.forEach((shift) => {
                  // If the shift is valid for the current week
                  if (shift.id !== "-1") {
                    let shiftText = new Date(shift.startTime).toString();
                    let shiftTextArr = shiftText.split(" ");
                    let day = shiftTextArr[0];
                    let time = shiftTextArr[4];

                    // Add the time on the correct day of the week
                    calender[day] = time;
                  }
                });

                return (
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {employee.firstName}
                    </TableCell>
                    <TableCell align="right">{calender.Sun}&nbsp;</TableCell>
                    <TableCell align="right">{calender.Mon}&nbsp;</TableCell>
                    <TableCell align="right">{calender.Tue}&nbsp;</TableCell>
                    <TableCell align="right">{calender.Wed}&nbsp;</TableCell>
                    <TableCell align="right">{calender.Thu}&nbsp;</TableCell>
                    <TableCell align="right">{calender.Fri}&nbsp;</TableCell>
                    <TableCell align="right">{calender.Sat}&nbsp;</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Wrapper>
    </Layout>
  );
};

export default Home;
