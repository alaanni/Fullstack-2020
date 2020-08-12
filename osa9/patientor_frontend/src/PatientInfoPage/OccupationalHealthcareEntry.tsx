import React from 'react';
import { OccupationalHealthcareEntry } from '../types';
import { Item, Icon } from 'semantic-ui-react';
import { DiagnosisList } from './DiagnosisList';

export const OccupationalHealthcareEntries: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
    return (
            <Item>
            <Item.Content verticalAlign='middle'>
                <Item.Header>{entry.date} <Icon name="doctor"/></Item.Header>
                <Item.Description>{entry.description}</Item.Description>
                {entry.diagnosisCodes ? <Item.Description><DiagnosisList diagnosisCodes={entry.diagnosisCodes}/></Item.Description> : null}
                {entry.sickLeave ? <Item.Extra>Sick leave from {entry.sickLeave.startDate} to {entry.sickLeave.endDate}</Item.Extra> : null}
            </Item.Content>
            </Item>
    );
};  