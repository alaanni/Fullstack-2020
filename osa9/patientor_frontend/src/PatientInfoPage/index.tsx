import React from "react";
import axios from "axios";
import { Icon, Item, Container } from "semantic-ui-react";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { useParams } from "react-router-dom";
import { updatePatient } from "../state/reducer";
import EntryDetails from "./EntryDetails";

const PatientInfoPage: React.FC = () => {
const [{patients}, dispatch] = useStateValue();
console.log('state? :',[{patients}, dispatch]);
console.log('patients:', patients);

const { id } = useParams<{ id: string }>();
console.log('id:', id);
const patient = patients[id];
console.log('patient:', patient);

const genderIcons = {
    male: {name: "mars" as "mars"},
    female: {name: "venus" as "venus"},
    other: {name: "other gender vertical" as "other gender vertical"}
};

React.useEffect(() => {
  const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(updatePatient(patientFromApi));
        console.log('patientFromApi:', patientFromApi);
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatient();
  }, [id, dispatch]);

  if(!patient) return null;
  if(!patient.entries) return null;

  return (
    <Container>
        <h1>{patient.name} <Icon {...genderIcons[patient.gender]}/></h1> 

        <div><b>snn: {patient.ssn}</b></div>
        <div><b>occupation: {patient.occupation}</b></div>
        
        <h2>entries</h2>

        <Item.Group divided>{patient.entries.map(entry => <EntryDetails key={entry.date} entry={entry}/>)}</Item.Group>

    </Container>
  );
};

export default PatientInfoPage;