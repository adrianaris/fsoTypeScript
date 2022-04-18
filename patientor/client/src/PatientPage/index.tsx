import React from "react";
import { useParams } from "react-router-dom";
import { useStateValue, addPatient } from "../state";
import { Patient } from "../types";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import EntryComponent from "../components/Entry";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  if (id && typeof id === "string" && patients[id]) {
    let patient: Patient = patients[id];
    if (patient["ssn"] === undefined) {
      const fetchPatient = async () => {
        try {
          const { data: fetchedPatient }= await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          dispatch(addPatient(fetchedPatient));
          patient = fetchedPatient;
        } catch (e) {
          console.log(e);
        }
      };
      void fetchPatient();
    }
    console.log(patient);
    return (
      <div>
        <h3>
          {patient.name}{" "}
          {patient.gender === "male" ? <MaleIcon />: <FemaleIcon />}
        </h3>
        <p>
          ssh: {patient.ssn}<br />
          occupation: {patient.occupation}
        </p>
        <h4>entries</h4>
          {patient.entries.length > 0 &&
            patient.entries.map(
              entry => <EntryComponent key={entry.id} entry={entry} />
        )}
      </div>
    );
  }
  return <h3>No patient with that id exists</h3>;
};

export default PatientPage;
