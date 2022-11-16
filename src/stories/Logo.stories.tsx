import React from 'react';
import { storiesOf } from '@storybook/react';
import { Card } from 'react-bootstrap';
import Logo from '../components/Logo';

const stories = storiesOf('Logo', module);

const logos: { width: number, serviceName?: string }[] = [
    { width: 50, serviceName: 'Products' },
    { width: 78, serviceName: 'Payments' },
    { width: 110, serviceName: 'Savings' },
    { width: 150 },
    { width: 200, serviceName: 'Notify' },
]

// 50, 78, 110, 150, 200

stories.add('Logo', () => {
    return (
        <Card>
            <Card.Body>
                {logos.map(l => (
                    <Logo src={require('../assets/images/logos/sidooh.png')} serviceName={l.serviceName}
                          width={l.width}/>
                ))}
            </Card.Body>
        </Card>
    );
});