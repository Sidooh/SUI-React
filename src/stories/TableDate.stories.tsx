import React from 'react';
import { storiesOf } from '@storybook/react';
import { Card } from 'react-bootstrap';
import TableDate from '../components/TableDate/TableDate';
import moment from 'moment';

const stories = storiesOf('Table Date', module);

stories.add('Table Date', () => {
    return (
        <Card>
            <Card.Body>
                <TableDate date={moment().subtract(1, 'M').toISOString()}/>
                <hr/>
                <TableDate date={moment().toISOString()} dateOverTime/>
            </Card.Body>
        </Card>
    );
});