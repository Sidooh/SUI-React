import React from 'react';
import { storiesOf } from '@storybook/react';
import { Card } from 'react-bootstrap';
import Waffle from '../components/Waffle';

const stories = storiesOf('Waffle', module);

stories.add('Waffle', () => {
    return (
        <Card>
            <Card.Body>
                <Waffle waffleLinks={[
                    {
                        avatarText: 'A',
                        title: 'Accounts',
                        link: '/',
                        contentClass: 'bg-soft-primary text-primary',
                        enabled: true
                    },
                    {
                        avatarText: 'E',
                        title: 'Enterprise',
                        link: `/events/event-detail`,
                        contentClass: 'bg-soft-primary text-primary',
                    },
                    {
                        avatarText: 'N',
                        title: 'Notify',
                        link: '/',
                        contentClass: 'bg-soft-primary text-primary',
                        enabled: true
                    },
                    {
                        avatarText: 'P',
                        title: 'Payments',
                        link: '/',
                        contentClass: 'bg-soft-primary text-primary',
                        enabled: true
                    },
                    {
                        avatarText: 'P',
                        title: 'Products',
                        link: '/',
                        contentClass: 'bg-soft-primary text-primary',
                        enabled: true
                    },
                    {
                        avatarText: 'S',
                        title: 'Savings',
                        link: '/',
                        contentClass: 'bg-soft-primary text-primary',
                        enabled: true
                    },
                    {
                        avatarText: 'U',
                        title: 'USSD',
                        link: '/',
                        contentClass: 'bg-soft-primary text-primary',
                        enabled: true
                    },
                ]}/>
            </Card.Body>
        </Card>
    );
});