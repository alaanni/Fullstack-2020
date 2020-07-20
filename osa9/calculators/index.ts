import express from 'express';
//import { parseArgs, calculateExercises } from './exerciseCalculator';
import { calculateBmi } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  console.dir(req.query.height)
  console.dir(req.query.weight)

  const { height, weight } = req.query
  const result = calculateBmi(Number(height), Number(weight))
  res.send({
    'height': req.query.height,
    'weight': req.query.weight,
    'bmi': result
  });
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});