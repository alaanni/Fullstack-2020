import diagnoses from '../../data/diagnoses';
import { Diagnosis } from '../types';

const getEntries = (): Array<Diagnosis> => {
  return diagnoses;
};

export default {
  getEntries
};