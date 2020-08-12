import React from 'react';
import { HealthCheckEntry } from '../types';
import { Item, Icon } from 'semantic-ui-react';
import { DiagnosisList } from './DiagnosisList';

export const HealthCheckEntries: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
    return (
        <div>
            <Item>
            <Item.Content>
                <Item.Header>{entry.date} <Icon name="heartbeat"/></Item.Header>
                <Item.Description>{entry.description}</Item.Description>
                {entry.diagnosisCodes ? <DiagnosisList diagnosisCodes={entry.diagnosisCodes}/> : null}
                {entry.healthCheckRating}
            </Item.Content>
            </Item>
        </div>
    );
};  