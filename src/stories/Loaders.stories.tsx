import { ComponentLoader, PageLoader, SectionLoader } from '../components';
import { storiesOf } from '@storybook/react';
import React from 'react';
import '../assets/css/theme.min.css';
import '../assets/css/user.min.css';
import { Card } from 'react-bootstrap';

const stories = storiesOf('Loaders', module);

stories.add('Component Loader', () => {
    return (
        <Card>
            <Card.Body>
                <ComponentLoader/>
            </Card.Body>
        </Card>
    );
});

stories.add('Section Loader', () => {
    return (
        <Card>
            <Card.Body>
                <SectionLoader/>
            </Card.Body>
        </Card>
    );
});

stories.add('Page Loader', () => {
    return (
        <Card>
            <Card.Body>
                <PageLoader/>
            </Card.Body>
        </Card>
    );
});