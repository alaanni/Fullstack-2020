import React from 'react';
import { Entry } from '../types';
import { Item, Icon } from 'semantic-ui-react';

export const OccupationalHealthcareEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
    return (
        <div>
            <Item>
            <Item.Content>
                <Item.Header>{entry.date} <Icon name="doctor"/></Item.Header>
            </Item.Content>
            </Item>
        </div>
    );
};  