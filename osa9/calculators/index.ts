import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

interface ReqType {
  target: number,
  daily_exercises: Array<number>
}

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  console.dir(req.query.height);
  console.dir(req.query.weight);

  const { height, weight } = req.query;
  if (!isNaN(Number(height)) || !isNaN(Number(weight))) {
    const result = calculateBmi(Number(height), Number(weight));
    res.send({
      'height': req.query.height,
      'weight': req.query.weight,
      'bmi': result
      });
  } else {
      res.status(400).json({
        error: 'malformatted parameters'
      });
  }
  
});

app.post('/exercises', (req, res) => {
  const body = req.body as ReqType;
  const target = body.target;
  const daily_exercises = body.daily_exercises;

  if(target === undefined || daily_exercises === undefined) {
    res.status(400).json({
      error: 'parameters missing'
    });
  } 

  if(isNaN(target) || daily_exercises.includes(NaN)) {
    res.status(400).json({
      error: 'malformmatted parameters'
    });
  }

  const result = calculateExercises(daily_exercises, target);
  res.json(result);
});


const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});