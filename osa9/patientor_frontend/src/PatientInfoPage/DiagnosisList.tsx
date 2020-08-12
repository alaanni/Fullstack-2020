import React from "react";
import { Diagnosis } from "../types";
import { useStateValue } from "../state";

export const DiagnosisList: React.FC<{diagnosisCodes: Array<Diagnosis['code']>}> = ({ diagnosisCodes }) => {
    const [{ diagnoses }] = useStateValue();

    return (
        <div>
            <h2>Diagnoses</h2>
            <ul>{diagnosisCodes.map(code => <li key={code}>{code} {diagnoses[code].name}</li>)}</ul>
        </div>
    );
};