import React from 'react';
import { storiesOf } from '@storybook/react';
import { Card } from 'react-bootstrap';
import Logo from '../components/Logo';

const stories = storiesOf('Logo', module);

stories.add('Logo', () => {
    return (
        <Card>
            <Card.Body>
                <Logo width={50}/>
                <Logo/>
                <Logo width={110}/>
                <Logo width={150}/>
                <Logo width={200}/>
            </Card.Body>
        </Card>
    );
});