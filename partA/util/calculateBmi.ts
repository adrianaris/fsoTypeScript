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
    return 'Overweight (Pre-obese)';
  } else if (calculator() > 29.9) {
    return 'OBESE';
  } else {
    return 'IDK what I\'m doing';
  }
};

export default calculateBmi;
