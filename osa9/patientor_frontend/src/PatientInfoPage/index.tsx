import React from "react";
import axios from "axios";
import { Icon, Item, Container, Button } from "semantic-ui-react";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { useParams } from "react-router-dom";
import { updatePatient } from "../state/reducer";
import EntryDetails from "./EntryDetails";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import AddEntryModal from "../AddEntryModal";

const PatientInfoPage: React.FC = () => {
const [modalOpen, setModalOpen] = React.useState<boolean>(false);
const [error, setError] = React.useState<string | undefined>();
const [{patients}, dispatch] = useStateValue();
console.log('state? :',[{patients}, dispatch]);
console.log('patients:', patients);

const openModal = (): void => setModalOpen(true);

const closeModal = (): void => {
  setModalOpen(false);
  setError(undefined);
};

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

  const submitNewEntry = async (values: EntryFormValues) => {
    console.log('values:', values);
    try {
      const { data: newEntry } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(updatePatient(newEntry));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  if(!patient) return null;
  if(!patient.entries) return null;

  return (
    <Container>
        <h1>{patient.name} <Icon {...genderIcons[patient.gender]}/></h1> 

        <div><b>snn: {patient.ssn}</b></div>
        <div><b>occupation: {patient.occupation}</b></div>
        
        <h2>entries</h2>

        <Item.Group divided>{patient.entries.map(entry => <EntryDetails key={entry.date} entry={entry}/>)}</Item.Group>
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal} />
        <Button onClick={() => openModal()}>Add New Entry</Button>
    </Container>
    
  );
};

export default PatientInfoPage;