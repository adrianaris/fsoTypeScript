import { NewPatient } from "./types";
import {
  Gender,
  Entry,
//  Diagnose,
  Discharge,
  SickLeave,
  HealthCheckRating,
  EntryWithoutId } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseString = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error("Incorrect or missing field");
  }

  return text;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date" + date);
  }

  return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(gender);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender");
  }

  return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// const isDiagnose = (diag: any): diag is Diagnose => {
//   if (!diag.code || !diag.name || !isString(diag.code) || !isString(diag.name)) {
//     return false;
//   }
//   if (diag.latin) {
//     if (!isString(diag.latin)) return false;
//   }
//   return true;
// };
// 
// const parseDiag = (diag: unknown): Diagnose => {
//   if (!diag || !isDiagnose(diag)) {
//     throw new Error("Incorrect or missing Diagnosis");
//   }
//   return diag;
// };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseDiagCodes = (array: any): string[] => {
  if (!array || array.map((s: unknown) => isString(s)).includes(false)) {
    throw new Error("Incorrect or missing diagnosis code");
  }
  return array;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDischarge = (disch: any): disch is Discharge => {
  if (!disch.date || !disch.criteria || !isDate(disch.date) || !isString(disch.criteria)) {
    return false;
  }
  return true;
};

const parseDischarge = (disch: unknown): Discharge => {
  if (!disch || !isDischarge(disch)) {
    throw new Error("Incorrect or missing Discharge");
  }
  return disch;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isSickLeave = (leave: any): leave is SickLeave => {
  if (!leave.startDate || !leave.endDate || !isDate(leave.startDate) || !isDate(leave.endDate)) {
    return false;
  }
  return true;
};

const parseSickLeave = (leave: unknown): SickLeave => {
  if (!leave || !isSickLeave(leave)) {
    throw new Error("Incorrect or missing sickLeave");
  }
  return leave;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (rating: any): rating is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(rating);
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!rating || !isHealthCheckRating(rating)) {
    throw new Error("Incorrect or missing rating");
  }
  return rating;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isBaseEntry = (value: any): value is Entry => {
  if (
    !value.description || !value.date || !value.specialist
    || !isString(value.description) || !isDate(value.date)
    || !isString(value.specialist)
  ) return false;
  if (value.diagnosisCodes) {
    if (value.diagnosisCodes.map((d: string): boolean => isString(d)).includes(false)) return false;
  }
  return true;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHospitalEntry = (value: any): value is Entry => {
  if (
    !value.discharge || !isDischarge(value.discharge)
  ) return false;
  return true;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isOccupationalEntry = (value: any): value is Entry => {
  if (
    !value.employerName || !isString(value.employerName)
  ) return false;
  return true;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckEntry = (value: any): value is Entry => {
  if (
    !value.healthCheckRating
    || !isHealthCheckRating(value.healthCheckRating)
  ) return false;
  return true;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseEntries = (entries: any[]): Entry[]=> {
  if (entries.map(entry => isBaseEntry(entry)).includes(false)) {
    throw new Error('Base properties missing or invalid');
  }
  if (!entries.map(entry => isHealthCheckEntry(entry)).includes(false)) {
    return entries;
  }
  if (!entries.map(entry => isOccupationalEntry(entry)).includes(false)) {
    return entries;
  }
  if (!entries.map(entry => isHospitalEntry(entry)).includes(false)) {
    return entries;
  }
  throw new Error('The list contains no know entry types');
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntry = (entry: any): EntryWithoutId => {
  const newEntry = {
    description: parseString(entry.description),
    date: parseDate(entry.date),
    specialist: parseString(entry.specialist),
    ...(entry.diagnosisCodes && { diagnosisCodes: parseDiagCodes(entry.diagnosisCodes) })
  };
  if (!isBaseEntry(newEntry)) throw new Error("Incorrect base properties");
  if (entry.healthCheckRating) {
    return {
      ...newEntry,
      healthCheckRating: parseHealthCheckRating(entry.healthCheckRating),
      type: "HealthCheck"
    };
  }
  if(entry.employerName) {
    return {
      ...newEntry,
      employerName: parseString(entry.employerName),
      ...(entry.sickLeave && { sickLeave: parseSickLeave(entry.sickLeave) }),
      type: "OccupationalHealthcare"
    };
  }
  if(entry.discharge) {
    return {
      ...newEntry,
      discharge: parseDischarge(entry.discharge),
      type: "Hospital"
    };
  }
  
  throw new Error('FML');
};
 

type Fields = {
  name: unknown,
  dateOfBirth: unknown,
  ssn: unknown,
  gender: unknown,
  occupation: unknown,
  entries: unknown[]
};
const toNewPatient = (
    { name, dateOfBirth, ssn, gender, occupation, entries }: Fields
  ): NewPatient => {
  const newPatient: NewPatient = {
    name: parseString(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseString(ssn),
    gender: parseGender(gender),
    occupation: parseString(occupation),
    entries: parseEntries(entries)
  };

  return newPatient;
};

export default toNewPatient;
