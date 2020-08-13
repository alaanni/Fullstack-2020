
export enum Gender {
    Female = 'female',
    Male = 'male',
    Other = 'other',
  }

export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
  }

  export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
  }
  
interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
  }

interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: {
      date: string;
      criteria: string;
    };
  }

interface OccupationalHealthCareEntry extends BaseEntry {
    type: "OccupationalHealthCare";
    employerName: string;
    sickLeave: {
      startDate: string;
      endDate: string;
    };
  }

export type Entry =
  | HospitalEntry
  | OccupationalHealthCareEntry
  | HealthCheckEntry;

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
}

export type NonSensitivePatientEntry = Omit<Patient, 'ssn' | 'entries' >;

export type NewPatientEntry = Omit<Patient, 'id'>;

export type NewHospitalEntry = Omit<HospitalEntry, 'id'>;

export type NewOccupationalHealthcareEntry = Omit<OccupationalHealthCareEntry, 'id'>;

export type NewHealthCheckEntry = Omit<HealthCheckEntry, 'id'>;

export type NewEntry =
  | NewHospitalEntry
  | NewOccupationalHealthcareEntry
  | NewHealthCheckEntry;