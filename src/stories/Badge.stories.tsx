import { storiesOf } from '@storybook/react';
import React from 'react';
import './css/theme.min.css';
import './css/user.min.css';
import { Card } from 'react-bootstrap';
import Badge from '../components/Badge';

const stories = storiesOf('Badge', module);

stories.add('Soft', () => {
    return (
        <Card>
            <Card.Body>
                <Badge soft className={'me-1'}>Hello Sidooh</Badge>
                <Badge soft bg={'success'} className={'me-1'}>Hello Sidooh</Badge>
                <Badge soft bg={'warning'} className={'me-1'}>Hello Sidooh</Badge>
                <Badge soft bg={'dark'} className={'me-1'}>Hello Sidooh</Badge>
            </Card.Body>
        </Card>
    );
});

stories.add('Normal', () => {
    return (
        <Card>
            <Card.Body>
                <Badge className={'me-1'}>Hello Sidooh</Badge>
                <Badge bg={'success'} className={'me-1'}>Hello Sidooh</Badge>
                <Badge bg={'warning'} className={'me-1'}>Hello Sidooh</Badge>
                <Badge bg={'dark'} className={'me-1'}>Hello Sidooh</Badge>
            </Card.Body>
        </Card>
    );
});