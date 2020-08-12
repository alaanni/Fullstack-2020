import diagnoses from '../../data/diagnoses';
import { Diagnosis } from '../types';

const getEntries = (): Array<Diagnosis> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return diagnoses;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry
};