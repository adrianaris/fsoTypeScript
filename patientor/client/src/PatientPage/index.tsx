import React from "react";
import { useParams } from "react-router-dom";
import { useStateValue, addPatient } from "../state";
import { Patient } from "../types";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients, diagnoses }, dispatch] = useStateValue();
  console.log(diagnoses);
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
              entry => (
                <div key={entry.id}>{entry.date} {entry.description} <br />
                <ul>
                  {entry.diagnosisCodes && 
                      entry.diagnosisCodes.map(code => 
                      <li key={code}>{code} {diagnoses[code].name}</li>
                      )
                  }
                </ul></div>
        ))}
      </div>
    );
  }
  return <h3>No patient with that id exists</h3>;
};

export default PatientPage;
