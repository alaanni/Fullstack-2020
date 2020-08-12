import React from 'react';
import { HealthCheckEntry } from '../types';
import { Item, Icon } from 'semantic-ui-react';
import { DiagnosisList } from './DiagnosisList';
import HealthRatingBar from '../components/HealthRatingBar';

export const HealthCheckEntries: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
    return (
            <Item>
                <Item.Content verticalAlign='middle'>
                <Item.Header>{entry.date} <Icon name="heartbeat"/></Item.Header>           
                <Item.Description>{entry.description}</Item.Description>
                {entry.diagnosisCodes ? <Item.Description><DiagnosisList diagnosisCodes={entry.diagnosisCodes}/></Item.Description> : null}
                <Item.Extra><HealthRatingBar rating={entry.healthCheckRating} showText={true}/></Item.Extra>
                </Item.Content>
            </Item>
    );
};  