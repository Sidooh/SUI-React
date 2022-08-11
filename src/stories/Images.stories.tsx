import React from 'react';
import { storiesOf } from '@storybook/react';
import { Card } from 'react-bootstrap';
import { IMAGES } from '../constants';

const stories = storiesOf('Images', module);

stories.add('Images', () => {
    return (
        <Card>
            <Card.Body>
                <img src={IMAGES.logos.sidooh} alt={'Logo'} width={100}/>
                <img src={IMAGES.generic.card} alt={'Logo'} width={100}/>
                <img src={IMAGES.icons.paragraph} alt={'Logo'} width={100}/>
                <img src={IMAGES.icons.spotIllustrations.auth_corner} alt={'Logo'} width={100}/>
            </Card.Body>
        </Card>
    );
});