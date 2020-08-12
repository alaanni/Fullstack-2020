import React from 'react';
import { HospitalEntry } from '../types';
import { Item, Icon } from 'semantic-ui-react';
import { DiagnosisList } from './DiagnosisList';

export const HospitalEntries: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
    return (
            <Item>
                <Item.Content verticalAlign='middle'>
                <Item.Header>{entry.date} <Icon name="hospital outline"/></Item.Header>
                <Item.Description>{entry.description}</Item.Description>
                {entry.diagnosisCodes ? <Item.Description><DiagnosisList diagnosisCodes={entry.diagnosisCodes}/></Item.Description> : null}
                <Item.Extra>Discharged {entry.discharge.date}. {entry.discharge.criteria}</Item.Extra>
                </Item.Content>
            </Item>
    );
};  