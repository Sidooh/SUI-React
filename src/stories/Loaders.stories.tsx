import { ComponentLoader, PageLoader, SectionLoader } from '../components';
import { storiesOf } from '@storybook/react';
import React from 'react';
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
                <div style={{height:'20rem'}}>sasa</div>
                <PageLoader isDark={false}/>
            </Card.Body>
        </Card>
    );
});