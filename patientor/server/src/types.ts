export enum Gender {
  Male = 'male',
  Female = 'female',
}

export interface Diagnose {
  code: string,
  name: string,
  latin?: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
  entry: string
}

export interface Patient {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string
  entries: Entry[]
}

export type NonSensitivePatientData = Omit<Patient, 'ssn' | 'entries'>;
export type NewPatient = Omit<Patient, 'id'>;
export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>
