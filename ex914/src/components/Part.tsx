import { CoursePart } from '../types';

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member ${JSON.stringify(value)}`
    );
  };
 
  switch (coursePart.type) {
    case 'normal':
      return <p>
        <b>{coursePart.name} {coursePart.exerciseCount}</b><br/>
          <i>{coursePart.description}</i>
        </p>
    case 'groupProject':
      return <p>
          <b>{coursePart.name} {coursePart.exerciseCount}</b><br/>
          <i>project exercises {coursePart.groupProjectCount}</i>
        </p>
    case 'submission':
      return <p>
        <b>{coursePart.name} {coursePart.exerciseCount}</b><br/>
        <i>{coursePart.description}</i><br/> 
        submit to: {coursePart.exerciseSubmissionLink}
        </p>
    case 'special':
      return <p>
        <b>{coursePart.name}</b><br/>
        <i>{coursePart.description}{' '}</i><br/>
        requirements:{' '}
          {coursePart.requirements.map((req, index, array) => (
            <span key={req}>{req}
              {index === array.length - 1 ? ' ' : ', '}
            </span>
          ))}
        </p>
    default:
      return assertNever(coursePart);
  }

};

export default Part;
