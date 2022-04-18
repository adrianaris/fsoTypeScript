import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useStateValue, addPatient } from "../state";
import { Patient } from "../types";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import EntryComponent from "../components/Entry";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import { Button } from "@material-ui/core";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  if (id && typeof id === "string" && patients[id]) {
    let patient: Patient = patients[id];

    const openModal = (): void => setModalOpen(true);
    const closeModal = (): void => {
      setModalOpen(false);
      setError(undefined);
    };

    const submitNewEntry = async (values: EntryFormValues) => {
      try {
        const { data: modifiedPatient } = await axios.post<Patient>(
          `${apiBaseUrl}/patients/${id}/entries`,
          values
        );
        dispatch(addPatient(modifiedPatient));
        patient = modifiedPatient;
        closeModal();
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          console.error(e?.response?.data || "Unrecognized axios error");
          setError(String(e?.response?.data?.error) || "Unrecognized axios error");
        } else {
          console.error("Unknown error", e);
          setError("Unknown error");
        }
      }
    };

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
              entry => <EntryComponent key={entry.id} entry={entry} />
        )}
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <Button variant="contained" onClick={() => openModal()}>
          Add Entry
        </Button>
      </div>
    );
  }
  return <h3>No patient with id {id} exists!!!</h3>;
};

export default PatientPage;
