import diagnoses from '../../data/diagnoses';
import { DiagnoseEntry } from '../types';

const getEntries = (): Array<DiagnoseEntry> => {
  return diagnoses;
};

/*const addEntry = () => {
  return null;
};*/

export default {
  getEntries,
  //addEntry
};