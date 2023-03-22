import { PhoneChip, StatusChip } from '../components';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { Card } from 'react-bootstrap';
import { Status } from '../utils';
import '../assets/css/sidooh-theme.css';
import '../assets/css/user.css';

const stories = storiesOf('Chips', module);

stories.add('Status', () => {
    return (
        <Card>
            <Card.Body>
                {Object.values(Status).map(status => <StatusChip key={status} status={status} className={'me-3'}/>)}

                <hr/>

                {Object.values(Status).map(status => (
                    <StatusChip key={status} status={status} className={'me-3'}
                                onStatusChange={(s) => console.log(s)}
                                statuses={[Status.COMPLETED, Status.PENDING, Status.REFUNDED]}/>
                ))}
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