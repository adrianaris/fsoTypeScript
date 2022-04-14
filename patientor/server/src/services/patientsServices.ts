import {
  NonSensitivePatientData,
  Patient,
  NewPatient,
  PublicPatient
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

export default {
  getNonSensitivePatientData,
  addPatient,
  getPublicPatient
};
