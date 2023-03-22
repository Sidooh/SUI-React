import { storiesOf } from '@storybook/react';
import React from 'react';
import '../assets/css/sidooh-theme.css';
import '../assets/css/user.css';
import { Avatar } from '../components';
import { Card } from 'react-bootstrap';

const stories = storiesOf('Avatar', module);

stories.add('Avatar', () => {
    return (
        <Card>
            <Card.Body>
                {['s' , 'm' , 'l' , 'xl' , '2xl' , '3xl' , '4xl' , '5xl'].map(s => (
                    <Avatar isExact name={'A'} size={s} mediaClass="bg-soft-primary text-primary"/>
                ))}
            </Card.Body>
        </Card>
    );
});