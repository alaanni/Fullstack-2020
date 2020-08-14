import express from 'express';
import diagnoseService from '../services/diagnoseService';

const diagnosisRouter = express.Router();

diagnosisRouter.get('/', (_req, res) => {
  res.send(diagnoseService.getEntries());
});

export default diagnosisRouter;