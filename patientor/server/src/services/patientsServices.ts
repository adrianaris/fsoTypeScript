import { NonSensitivePatientData } from '../types';
import patients from '../data/patients';

const getNonSensitivePatientData = (): Array<NonSensitivePatientData> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

export default {
  getNonSensitivePatientData
}