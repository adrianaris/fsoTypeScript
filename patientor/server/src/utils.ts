import { NewPatient } from './types';
import { Gender, Entry } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error('Incorrect or missing field');
  }

  return text;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date' + date);
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
    throw new Error('Incorrect or missing gender');
  }

  return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
///const isEntry = (value: any): value is Entry => {
///  if (value && !isString(value)) {
///    return false
///  }
///    return true
///}
///
///const parseEntries = (entries: unknown[]): Entry[] => {
///  if(!entries || entries.map(e => isEntry(e)).includes(false)) {
///    throw new Error('Incorrect or missing entry');
///  }
///
///  return entries;
///};

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
    entries: entries as Entry[]
  };

  return newPatient;
};

export default toNewPatient;
