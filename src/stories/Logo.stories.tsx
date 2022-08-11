import React from 'react';
import { storiesOf } from '@storybook/react';
import { Card } from 'react-bootstrap';
import Logo from '../components/Logo';

const stories = storiesOf('Logo', module);

stories.add('Logo', () => {
    return (
        <Card>
            <Card.Body>
                {[50, 78, 110, 150, 200].map(w => <Logo src={require('../assets/images/logos/sidooh.png')} width={w}/>)}
            </Card.Body>
        </Card>
    );
});