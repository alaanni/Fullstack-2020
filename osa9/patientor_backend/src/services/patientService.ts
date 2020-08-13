import patients from '../../data/patients';
import { Patient, NonSensitivePatientEntry, NewPatientEntry, NewEntry } from '../types';
import { v4 as uuidv4 } from 'uuid';

let patientsList = [...patients];

const getEntries = (): Array<Patient> => {
  return patients;
};


const getNonSensitiveEntries = (): Array<NonSensitivePatientEntry> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
  }));
};

const findById = (id: string): Patient | undefined => {
  const entry = patients.find(d => d.id === id);
  return entry;
};


const addPatient = ( entry: NewPatientEntry ): Patient=> {
  const newPatientEntry = {
    id: uuidv4(),
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = ( newEntry: NewEntry, patient: Patient ): Patient=> {
  const entry = {
    id: uuidv4(),
    ...newEntry
  };
  const updatedPatient = { ...patient, entries: patient.entries.concat(entry)};
  patientsList = patientsList.map(p => p.id === updatedPatient.id ? updatedPatient : p);

  return updatedPatient;
};

export default {
  getEntries,
  addPatient,
  addEntry,
  getNonSensitiveEntries,
  findById
};