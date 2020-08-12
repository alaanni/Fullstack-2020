import React from 'react';
import { Entry } from '../types';
import { HospitalEntries } from './HospitalEntry';
import { OccupationalHealthcareEntries } from './OccupationalHealthcareEntry';
import { HealthCheckEntries } from './HealthCheckEntry';


const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

export const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
    case "Hospital":
        return <HospitalEntries entry={entry}/>;
    case "OccupationalHealthcare":
        return <OccupationalHealthcareEntries entry={entry}/>;
    case "HealthCheck":
        return <HealthCheckEntries entry={entry}/>;
    default:
        return assertNever(entry);
    }
};

export default EntryDetails;