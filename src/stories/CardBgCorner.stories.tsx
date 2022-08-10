import React from 'react';
import { storiesOf } from '@storybook/react';
import { Card, Col, Row } from 'react-bootstrap';
import CardBgCorner from '../components/CardBgCorner';

const stories = storiesOf('Card Background Corner', module);

stories.add('Card Background Corner', () => {
    return (
        <Row>
            {[1, 2, 3, 4, 5].map((i) => (
                <Col sm={6}>
                    <Card className={'mb-3'} style={{height: '7rem'}}>
                        <Card.Body><CardBgCorner corner={i as 1 | 2 | 3 | 4 | 5}/></Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
});