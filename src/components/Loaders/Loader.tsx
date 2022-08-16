import React from 'react';
import styled from 'styled-components';
import { Spinner } from 'react-bootstrap';

const PageLoaderWrapper = styled('div')({
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',

    zIndex: 1301,
});

const SectionLoaderWrapper = styled.div({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -70%)',
    zIndex: 1301,
});

const ComponentLoaderWrapper = styled.div({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '20vh'
});

const ComponentLoader = () => {
    return (
        <ComponentLoaderWrapper>
            <div style={{position: 'relative'}}>
                <Spinner animation="border" variant="primary"/>
            </div>
        </ComponentLoaderWrapper>
    );
};

// ==============================|| LOADER ||============================== //
const PageLoader = () => (
    <PageLoaderWrapper>
        <Spinner animation="border" variant="primary" style={{width: '7rem', height: '7rem'}}/>
    </PageLoaderWrapper>
);

const SectionLoader = () => {
    return (
        <SectionLoaderWrapper>
            <div style={{width: '5rem', height: '5rem'}}>
                <Spinner animation="border" variant="primary" style={{width: '5rem', height: '5rem'}}/>
            </div>
        </SectionLoaderWrapper>
    );
};

export {
    SectionLoader,
    PageLoader,
    ComponentLoader
};