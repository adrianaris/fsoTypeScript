import express from 'express'
import calculateBmi from './util/calculateBmi'
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);
  if (!weight || !height || isNaN(weight) || isNaN(height)) {
    return res.status(400).json({ error: 'malformatted parameters' })
  } else {
    return res.status(202).json({
      weight: weight,
      height: height,
      bmi: calculateBmi(height, weight)
    })
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on pot ${PORT}`);
});
