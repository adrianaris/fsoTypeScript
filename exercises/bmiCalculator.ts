interface PatientDescriptors {
  height: number;
  weight: number;
};

const argsParser = (args: Array<string>): PatientDescriptors => {
  if (args.length < 4 || args.length > 4) throw new Error('The script must be called with exactly 2 arguments');
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  };
};

const calculateBmi = (a: number, b: number): string => {
  if (a > 3) a = a / 100; // turn to m if cm

  const calculator = (): number => {
    return b / (a ** 2);
  };

  if (calculator() < 16.0) {
    return 'Underweight (Severe thinness)';
  } else if (calculator() > 15.9 && calculator() < 17.0) {
    return 'Underweight (Moderate thinness)';
  } else if (calculator() > 16.9 && calculator() < 18.5) {
    return 'Underweight (Mild thinness)';
  } else if (calculator() > 18.4 && calculator() < 25.0) {
    return 'Normal (healthy weight)';
  } else if (calculator() > 24.9 && calculator() < 30.0) {
    return 'Overweight (Pre-obese)'
  } else if (calculator() > 29.9) {
    return 'OBESE'
  };
};

try {
  const { height, weight } = argsParser(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  };
  console.log(errorMessage);
};
