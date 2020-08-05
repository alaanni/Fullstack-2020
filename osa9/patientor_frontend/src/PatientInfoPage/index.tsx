import React, { useEffect } from "react";
import axios from "axios";
import { Icon } from "semantic-ui-react";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { useParams } from "react-router-dom";

const PatientInfoPage: React.FC = () => {
const [{patients}, dispatch] = useStateValue();
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

useEffect(() => {
  const fetchPatient = async () => {
    try {
      const { data: patientFromApi } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`
      );
      dispatch({ type: "UPDATE_PATIENT", payload: patientFromApi });
    } catch (e) {
      console.error(e);
    }
  };
  fetchPatient();
}, [id, dispatch]);

  return (
    <div>
        <h1>{patient.name} <Icon {...genderIcons[patient.gender]}/></h1> 

        <div><b>snn: {patient.ssn}</b></div>
        <div><b>occupation: {patient.occupation}</b></div>
    </div>
  );
};

export default PatientInfoPage;
