import {
  NonSensitivePatientData,
  Patient,
  NewPatient,
  PublicPatient,
  EntryWithoutId
} from '../types';
import patients from '../data/patients';
import { v1 as uuid } from 'uuid';

const getNonSensitivePatientData = (): Array<NonSensitivePatientData> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};

const getPublicPatient = (id: string): PublicPatient | undefined => {
  return patients.find(p => p.id === id);
};

const addEntry = (id: string, entry: EntryWithoutId): Patient | undefined => {
  const patient = patients.find(p => p.id === id)
  if (!patient) return;
  const newEntry = {
    ...entry,
    id: uuid()
  };

  patient.entries.push(newEntry);
  const patientIndex = patients.findIndex(p => p.id === id);
  patients.splice(patientIndex, 1);
  patients.push(patient);
  return patient;
};

export default {
  getNonSensitivePatientData,
  addPatient,
  getPublicPatient,
  addEntry
};
