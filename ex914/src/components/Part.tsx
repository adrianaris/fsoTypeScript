import { CoursePart } from '../types';

const Part = (courseParts: CoursePart[]) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member ${JSON.stringify(value)}`
    );
  };

  courseParts.forEach(part => {
    switch (part.name) {
      case '':
        break;
      case '':
        break;
      case '':
        break;
      default:
        return assertNever(part);
    }
  });
};
