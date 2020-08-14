/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { 
  NewPatientEntry,
  Entry,
  Gender, 
  NewHealthCheckEntry, 
  NewHospitalEntry, 
  NewOccupationalHealthcareEntry
} from './types';


const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseName = (name: any): string => {
    if (!name || !isString(name)) {
      throw new Error('Incorrect or missing name');
    }
    return name;
  };

const isDate = (date: string): boolean => {
return Boolean(Date.parse(date));
};

const parseDate = (dateOfBirth: any): string => {
if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('Incorrect or missing date');
}
return dateOfBirth;
};

const parseSsn = (ssn: any): string => {
    if (!ssn || !isString(ssn)) {
      throw new Error('Incorrect or missing social security number');
    }
    return ssn;
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender');
    }
    return gender;
};

const parseOccupation = (occupation: any): string => {
    if (!occupation || !isString(occupation)) {
      throw new Error('Incorrect or missing occupation');
    }
    return occupation;
};


const parseEntries = (entries: any): Entry[] => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return entries;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const toNewPatientEntry = (object: any): NewPatientEntry => {
    return {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      entries: parseEntries(object.entries)
    };
  };

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const toNewEntry = (object: NewHospitalEntry | NewOccupationalHealthcareEntry | NewHealthCheckEntry): NewHospitalEntry | NewOccupationalHealthcareEntry | NewHealthCheckEntry => {
  return object;
  
};
