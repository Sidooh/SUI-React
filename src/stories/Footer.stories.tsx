import { storiesOf } from '@storybook/react';
import React from 'react';
import './css/theme.min.css';
import './css/user.min.css';
import { Footer } from '../components';
import { Card } from 'react-bootstrap';

const stories = storiesOf('Footer', module);

stories.add('Footer', () => {
    return (
        <Card>
            <Card.Body><Footer serviceName={'Savings'} version={2.1}/></Card.Body>
        </Card>
    );
});