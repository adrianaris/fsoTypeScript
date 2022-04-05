interface HowLazyAreYou {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface WorkPrescription {
  targetAverage: number;
  workDone: Array<number>;
}

const argsParser = (args: Array<string>): WorkPrescription => {
  if (args.length < 4) throw new Error('Not enaugh arguments');
  args.shift();
  args.shift();
  const numberArgs = args.map(e => Number(e));
  if (numberArgs.includes(NaN)) throw new Error('Provided values were not numbers!');

  return {
    targetAverage: numberArgs.shift(),
    workDone: numberArgs
  };
};

const calculateExercises = (workDone: Array<number>, targetAverage: number): HowLazyAreYou => {
  const periodLength = workDone.length;
  const trainingDays = workDone.reduce((p, c) => c > 0 ? p + 1 : p + 0, 0);
  const average = workDone.reduce((p, c) => p + c) / periodLength;
  const success = average >= targetAverage ? true : false;

  const ratingCalc = () => {
    if (average <= targetAverage * 5/10) {
      return {
        rating: 1,
        ratingDescription: 'You are totaly lazy'
      };
    } else if (average > targetAverage * 5/10 && average < targetAverage) {
      return {
        rating: 2,
        ratingDescription: 'not too bad but could be better'
      };
    } else {
      return {
        rating: 3,
        ratingDescription: 'gg, you won'
      };
    }
  };

  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    ...ratingCalc(),
    target: targetAverage,
    average: average
  };
};

try {
  const { targetAverage, workDone } = argsParser(process.argv);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  console.log(calculateExercises(workDone, Number(targetAverage)));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
