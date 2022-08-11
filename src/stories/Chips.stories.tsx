import { PhoneChip, StatusChip } from '../components';
import { storiesOf } from '@storybook/react';
import React from 'react';
import '../assets/css/theme.min.css';
import '../assets/css/user.min.css';
import { Card } from 'react-bootstrap';
import { Status } from '../utils';

const stories = storiesOf('Chips', module);

stories.add('Status', () => {
    return (
        <Card>
            <Card.Body>
                {Object.values(Status).map(status => <StatusChip key={status} status={status} className={'me-3'}/>)}
            </Card.Body>
        </Card>
    );
});

stories.add('Phone', () => {
    return (
        <Card>
            <Card.Body>
                {[254110039317, 254736388405, 254777180801].map(phone => (
                    <PhoneChip key={phone} phone={phone} className={'me-3'}/>
                ))}
            </Card.Body>
        </Card>
    );
});