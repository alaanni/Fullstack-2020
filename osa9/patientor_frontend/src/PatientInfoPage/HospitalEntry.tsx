import React from 'react';
import { Entry } from '../types';
import { Item, Icon } from 'semantic-ui-react';

export const HospitalEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
    return (
        <div>
            <Item>
            <Item.Content>
                <Item.Header>{entry.date} <Icon name="hospital outline"/></Item.Header>
            </Item.Content>
            </Item>
        </div>
    );
};  