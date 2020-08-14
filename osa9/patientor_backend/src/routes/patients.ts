/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientService from '../services/patientService';
import { toNewPatientEntry, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);
  if (patient) {
    console.log(patient);
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.get('/:id/entries', (req, res) => {
  const patient = patientService.findById(req.params.id);
  if (patient) {
    console.log(patient.entries);
    res.send(patient.entries);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedPatient = patientService.addPatient(newPatientEntry);
    res.json(addedPatient);
  } catch (e) {
    res.status(400);
  }
});

router.post('/:id/entries', (req, res) => {
  const patient = patientService.findById(req.params.id);
  if(patient) {
    const newEntry = toNewEntry(req.body);
    const entryAddedPatient = patientService.addEntry(newEntry, patient);
    res.json(entryAddedPatient);
    console.log('entryAddedPatient:', entryAddedPatient);
  } else {
    res.status(400);
  }
});

export default router;