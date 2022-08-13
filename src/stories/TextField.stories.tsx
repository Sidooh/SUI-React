import { storiesOf } from '@storybook/react';
import React from 'react';
import { Card } from 'react-bootstrap';
import TextField from '../components/TextField';

const stories = storiesOf('Text Field', module);

stories.add('Text Field', () => {
    return (
        <Card>
            <Card.Body>
                <TextField label={'Some Label'} name={'some name'}/>
            </Card.Body>
        </Card>
    );
});