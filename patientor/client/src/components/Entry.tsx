import React from "react";
import styled from "styled-components";
import { Entry } from "../types";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import WorkIcon from "@mui/icons-material/Work";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Layout = styled.div`
  border: 1px solid;
  border-radius: 5px;
  margin: 0 0 8px 0;
  padding: 4px;
  display: flex;
  flex-direction: column;
  > div {
    padding: 2px;
  }
`;

const HospitalEntry: React.FC<{ entry: Entry; Icon: any }> = ({ entry, Icon }) => {
  return (
    <Layout>
      <div>{entry.date} <Icon /></div>
      <div><i>{entry.description}</i></div>
      <div>diagnose by {entry.specialist}</div>
    </Layout>
  );
};

const OccupationalHealthcareEntry: React.FC<{ entry: Extract<Entry, {type:  "OccupationalHealthcare"}>; Icon: any }> = ({ entry, Icon}) => {
   return (
    <Layout>
      <div>{entry.date} <Icon /><i> {entry.employerName}</i></div>
      <div><i>{entry.description}</i></div>
      <div>diagnose by {entry.specialist}</div>
    </Layout>
  );
};

const HealthCheckEntry: React.FC<{ entry: Extract<Entry, { type: "HealthCheck"}>; Icon: any }> = ({ entry, Icon}) => {
  let color = 'disabled';
  switch (entry.healthCheckRating) {
    case 0:
      color = "red";
      break;
    case 1:
      color = 'pink';
      break;
    case 2:
      color = "yellow";
      break;
    case 3:
      color = "black";
      break;
    default:
      return null;
  }

   return (
    <Layout>
      <div>{entry.date} <Icon /></div>
      <div><i>{entry.description}</i></div>
      {entry.healthCheckRating !== undefined &&
        <FavoriteIcon sx={{ color: color }} />
      }
      <div>diagnose by {entry.specialist}</div>
    </Layout>
  );
};

const EntryComponent = ({ entry }: { entry: Entry }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member ${JSON.stringify(value)}`
    );
  };

  switch (entry.type) {
    case "Hospital":
      return <HospitalEntry entry={entry} Icon={MedicalServicesIcon} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntry entry={entry} Icon={WorkIcon} />;
    case "HealthCheck":
      return <HealthCheckEntry entry={entry} Icon={MedicalServicesIcon} />;
    default:
      return assertNever(entry);
  }
};

export default EntryComponent;
