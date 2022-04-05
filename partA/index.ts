import express from 'express';
import calculateBmi from './util/calculateBmi';
import { calculator } from './calculator';
import calculateExercises from './util/calculateExercises';
const app = express();
app.use(express.json())

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);
  if (!weight || !height || isNaN(weight) || isNaN(height)) {
    return res.status(400).json({ error: 'malformatted parameters' });
  } else {
    return res.status(202).json({
      weight: weight,
      height: height,
      bmi: calculateBmi(height, weight)
    });
  }
});

app.post('/calculator', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { value1, value2, op } = req.body;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculator(value1, value2, op);
  res.send(result);
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  // eslint-disable-next-line
  const targetAverage = Number(target);
  // eslint-disable-next-line 
  const workDone = daily_exercises.map((e: any) => Number(e));

  if (!daily_exercises || !target) {
    return res.status(400).json({ error: 'parameters missing' });
  // eslint-disable-next-line
  } else if (isNaN(targetAverage) || workDone.includes(NaN)) {
    return res.status(400).json({ error: 'malformatted parameters' });
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculateExercises(workDone, targetAverage);
    return res.status(202).json(result);
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on pot ${PORT}`);
});
