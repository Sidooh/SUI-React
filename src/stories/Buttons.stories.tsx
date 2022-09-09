import React from 'react';
import { storiesOf } from '@storybook/react';
import { Card, Form } from 'react-bootstrap';
import LoadingButton from '../components/LoadingButton';
import Button from '../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faSave } from '@fortawesome/free-solid-svg-icons';
import IconButton from '../components/IconButton';

const stories = storiesOf('Buttons', module);

stories.add('Button', () => {
    return (
        <Card>
            <Card.Body>
                <Button className={'me-1'}>Loading</Button>

                <hr/>

                <Button className={'me-1'} endIcon={<FontAwesomeIcon icon={faSave}/>}>Save</Button>

                <hr/>

                <Button className={'me-1'} size={'sm'}>Loading</Button>
                <Button className={'me-1'} size={'sm'} endIcon={<FontAwesomeIcon icon={faSave}/>}>Save</Button>
            </Card.Body>
        </Card>
    );
});

stories.add('Icon Button', () => {
    return (
        <Card>
            <Card.Body>
                <IconButton size={'sm'}><FontAwesomeIcon icon={faPen}/></IconButton>
                <IconButton size={'sm'} color={'secondary'}><FontAwesomeIcon icon={faPen}/></IconButton>
                <IconButton size={'sm'} color={'success'}><FontAwesomeIcon icon={faPen}/></IconButton>
                <IconButton size={'sm'} color={'danger'}><FontAwesomeIcon icon={faPen}/></IconButton>
                <IconButton size={'sm'} color={'warning'}><FontAwesomeIcon icon={faPen}/></IconButton>
                <IconButton size={'sm'} color={'info'}><FontAwesomeIcon icon={faPen}/></IconButton>
                <IconButton size={'sm'} color={'dark'}><FontAwesomeIcon icon={faPen}/></IconButton>
                <hr/>
                <IconButton><FontAwesomeIcon icon={faPen}/></IconButton>
                <IconButton color={'secondary'}><FontAwesomeIcon icon={faPen}/></IconButton>
                <IconButton color={'success'}><FontAwesomeIcon icon={faPen}/></IconButton>
                <IconButton color={'danger'}><FontAwesomeIcon icon={faPen}/></IconButton>
                <IconButton color={'warning'}><FontAwesomeIcon icon={faPen}/></IconButton>
                <IconButton color={'info'}><FontAwesomeIcon icon={faPen}/></IconButton>
                <IconButton color={'dark'}><FontAwesomeIcon icon={faPen}/></IconButton>
                <hr/>
                <IconButton size={'lg'}><FontAwesomeIcon icon={faPen}/></IconButton>
                <IconButton size={'lg'} color={'secondary'}><FontAwesomeIcon icon={faPen}/></IconButton>
                <IconButton size={'lg'} color={'success'}><FontAwesomeIcon icon={faPen}/></IconButton>
                <IconButton size={'lg'} color={'danger'}><FontAwesomeIcon icon={faPen}/></IconButton>
                <IconButton size={'lg'} color={'warning'}><FontAwesomeIcon icon={faPen}/></IconButton>
                <IconButton size={'lg'} color={'info'}><FontAwesomeIcon icon={faPen}/></IconButton>
                <IconButton size={'lg'} color={'dark'}><FontAwesomeIcon icon={faPen}/></IconButton>
            </Card.Body>
        </Card>
    );
});

stories.add('Loading Button', () => {
    const [loading, setLoading] = React.useState(false);

    return (
        <Card>
            <Card.Body>
                <Form.Check type="switch" id="custom-switch" label="Loading" onClick={() => setLoading(!loading)}/>

                <LoadingButton className={'me-1'} onClick={() => setLoading(!loading)}>Loading</LoadingButton>
                <LoadingButton className={'me-1'} onClick={() => setLoading(!loading)}
                               endIcon={<FontAwesomeIcon icon={faSave}/>}>Loading</LoadingButton>
                <LoadingButton className={'me-1'} onClick={() => setLoading(!loading)}
                               loading={loading}>Loading</LoadingButton>
                <LoadingButton className={'me-1'} onClick={() => setLoading(!loading)} loading={loading}
                               loadingPosition={'end'}
                               endIcon={<FontAwesomeIcon icon={faSave}/>}>Loading End</LoadingButton>
                <hr/>
                <LoadingButton className={'me-1'} size={'sm'}
                               onClick={() => setLoading(!loading)}>Loading</LoadingButton>
                <LoadingButton className={'me-1'} size={'sm'} onClick={() => setLoading(!loading)}
                               endIcon={<FontAwesomeIcon icon={faSave}/>}>Loading</LoadingButton>
                <LoadingButton className={'me-1'} size={'sm'} onClick={() => setLoading(!loading)}
                               loading={loading}>Loading</LoadingButton>
                <LoadingButton className={'me-1'} size={'sm'} onClick={() => setLoading(!loading)} loading={loading}
                               loadingPosition={'end'}
                               endIcon={<FontAwesomeIcon icon={faSave}/>}>Loading End</LoadingButton>
            </Card.Body>
        </Card>
    );
});