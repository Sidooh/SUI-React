import { Card, Form } from 'react-bootstrap';
import LoadingButton from '../components/LoadingButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

const meta: Meta<typeof LoadingButton> = {
    title: 'LoadingButton',
    component: LoadingButton,
};

export default meta;

type Story = StoryObj<typeof LoadingButton>;

export const Default: Story = {
    render: () => {
        const [loading, setLoading] = useState(false);

        return (
            <Card>
                <Card.Body>
                    <Form.Check type="switch" id="custom-switch" label="Loading" onClick={() => setLoading(!loading)}/>

                    <LoadingButton className={'me-1'} onClick={() => setLoading(!loading)}>Loading</LoadingButton>
                    <LoadingButton className={'me-1'} onClick={() => setLoading(!loading)}
                                   endIcon={<FontAwesomeIcon icon={faSave}/>}>
                        Loading
                    </LoadingButton>
                    <LoadingButton className={'me-1'} onClick={() => setLoading(!loading)} loading={loading}>
                        Loading
                    </LoadingButton>
                    <LoadingButton
                        className={'me-1'}
                        onClick={() => setLoading(!loading)}
                        loading={loading}
                        loadingPosition={'start'}
                        startIcon={<FontAwesomeIcon icon={faSave}/>}>
                        Loading Start
                    </LoadingButton>
                    <LoadingButton
                        className={'me-1'}
                        onClick={() => setLoading(!loading)}
                        loading={loading}
                        loadingPosition={'end'}
                        endIcon={<FontAwesomeIcon icon={faSave}/>}>
                        Loading End
                    </LoadingButton>
                    <hr/>
                    <LoadingButton className={'me-1'} size={'sm'} onClick={() => setLoading(!loading)}>
                        Loading
                    </LoadingButton>
                    <LoadingButton
                        className={'me-1'}
                        size={'sm'}
                        onClick={() => setLoading(!loading)}
                        endIcon={<FontAwesomeIcon icon={faSave}/>}>
                        Loading
                    </LoadingButton>
                    <LoadingButton
                        className={'me-1'}
                        size={'sm'}
                        onClick={() => setLoading(!loading)}
                        loading={loading}
                    >
                        Loading
                    </LoadingButton>
                    <LoadingButton
                        className={'me-1'}
                        size={'sm'}
                        onClick={() => setLoading(!loading)}
                        loading={loading}
                        loadingPosition={'start'}
                        startIcon={<FontAwesomeIcon icon={faSave}/>}>
                        Loading Start
                    </LoadingButton>
                    <LoadingButton
                        className={'me-1'}
                        size={'sm'}
                        onClick={() => setLoading(!loading)}
                        loading={loading}
                        loadingPosition={'end'}
                        endIcon={<FontAwesomeIcon icon={faSave}/>}>
                        Loading End
                    </LoadingButton>
                </Card.Body>
            </Card>
        )
    }
}