import { storiesOf } from '@storybook/react';
import React from 'react';
import { Card } from 'react-bootstrap';
import Badge from '../components/Badge';
import { Color } from 'react-bootstrap/types';

const stories = storiesOf('Badge', module);

const colors = ['primary', 'success', 'danger', 'warning', 'info', 'secondary'] as Color[];

stories.add('Normal', () => {
    return (
        <Card>
            <Card.Body>
                {colors.map(color => <Badge key={color} bg={color} className={'me-2'}>Hello Sidooh</Badge>)}
                <h5>Pills</h5>
                {colors.map(color => <Badge key={color} bg={color} className={'me-2'}>Hello Sidooh</Badge>)}
            </Card.Body>
        </Card>
    );
});

stories.add('Soft', () => {
    return (
        <Card>
            <Card.Body>
                {colors.map(color => <Badge soft key={color} bg={color} className={'me-2'}>Hello Sidooh</Badge>)}

                <hr/>
                {colors.map(color => <Badge soft pill key={color} bg={color} className={'me-2'}>Hello Sidooh</Badge>)}
            </Card.Body>
        </Card>
    );
});