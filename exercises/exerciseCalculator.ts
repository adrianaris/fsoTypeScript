interface HowLazyAreYou {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
};

const calculateExercises = (workDone: Array<number>, targetAverage: number): HowLazyAreYou => {
  const periodLength = workDone.length;
  const trainingDays = workDone.reduce((p, c) => c > 0 ? p + 1 : p + 0, 0);
  const average = workDone.reduce((p, c) => p + c) / periodLength;
  const success = average >= targetAverage ? true : false;

  const ratingCalc = () => {
    if (average < targetAverage * 5/10) {
      return {
        rating: 1,
        ratingDescription: 'You are totaly lazy'
      }
    } else if (average > targetAverage * 5/10 && average < targetAverage) {
      return {
        rating: 2,
        ratingDescription: 'not too bad but could be better'
      }
    } else {
      return {
        rating: 3,
        ratingDescription: 'gg, you won'
      }
    };
  };

  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    ...ratingCalc(),
    target: targetAverage,
    average: average
  }
};

let work = [3, 0, 2, 4.5, 0, 3, 1];

console.log(calculateExercises(work, 2));
