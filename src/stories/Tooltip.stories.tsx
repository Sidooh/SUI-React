import React from 'react';
import { storiesOf } from '@storybook/react';
import { Card } from 'react-bootstrap';
import Tooltip from '../components/Tooltip';
import Button from '../components/Button';

const stories = storiesOf('Tooltip', module);

stories.add('Tooltip', () => {
    return (
        <Card>
            <Card.Body className={'d-flex justify-content-center p-5'}>
                <Tooltip title={'Tooltip Left'} placement={'left'}>
                    <Button className={'me-1'}>Tooltip Left</Button>
                </Tooltip>
                <Tooltip title={'Tooltip Top'} placement={'top'}>
                    <Button className={'me-1'}>Tooltip Top</Button>
                </Tooltip>
                <Tooltip title={<span>Tooltip <b><u>Bottom</u></b></span>}>
                    <Button className={'me-1'}>Tooltip Bottom</Button>
                </Tooltip>
                <Tooltip title={'Tooltip Right'} placement={'right'}>
                    <Button className={'me-1'}>Tooltip Right</Button>
                </Tooltip>
            </Card.Body>

            <Card.Body className={'d-flex justify-content-center p-5'}>
                <Tooltip
                    title={<span style={{
                        display: "-webkit-box",
                        overflow: "hidden",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                        cursor: "context-menu",
                        maxWidth: '25rem'
                    }}>
                        Congratulations! You have received Ksh100.00 airtime from Sidooh account 254723604233 on 06/09/22, 7:05 AM. Sidooh Makes You Money with Every Purchase. Dial *384*99# NOW for FREE on your Safaricom line to BUY AIRTIME & START EARNING from your purchases.`
                    </span>}
                    placement={'left'}>
                    <Button className={'me-1'}>Tooltip Left</Button>
                </Tooltip>
            </Card.Body>

            <Card.Body className={'d-flex justify-content-center p-5'}>
                <p>
                    I am a {' '}
                    <Tooltip title={`I am a Tooltip`}><b>Tooltip</b></Tooltip> {' '}
                    within a paragraph.
                </p>
            </Card.Body>
        </Card>
    );
});