import styled from 'styled-components';
import { Spinner } from 'react-bootstrap';

const PageLoaderWrapper = styled('div')<{ isDark?: boolean }>(({ isDark }) => ({
    width: '100vw',
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `${isDark ? 'var(--sidooh-dark)' : 'var(--sidooh-body-bg)'}`,
    zIndex: 1301,

    '& h4': {
        color: `${isDark ? 'var(--sidooh-body-bg)' : 'var(--sidooh-heading-color)'}`
    }
}));

/*const rotate = keyframes`
  from {
    transform: rotate(360deg);
  }

  to {
    transform: rotate(0deg);
  }
`;

const PageLoaderText = styled.h4`
  font-family: 'Pacifico', cursive;
  animation: ${rotate} 7s linear infinite;
  position: absolute
`;*/

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
            <div style={{ position: 'relative' }}>
                <Spinner animation="border" variant="primary"/>
            </div>
        </ComponentLoaderWrapper>
    );
};

// ==============================|| LOADER ||============================== //
const PageLoader = ({ isDark }: { isDark?: boolean }) => {
    return (
        <PageLoaderWrapper isDark={isDark}>
            {/*<PageLoaderText>SIDOOH</PageLoaderText>*/}
            <Spinner animation="border" variant={isDark ? 'secondary' : "primary"}
                     style={{ width: '10rem', height: '10rem' }}/>
        </PageLoaderWrapper>
    );
};

const SectionLoader = () => {
    return (
        <SectionLoaderWrapper>
            <div style={{ width: '5rem', height: '5rem' }}>
                <Spinner animation="border" variant="primary" style={{ width: '5rem', height: '5rem' }}/>
            </div>
        </SectionLoaderWrapper>
    );
};

export {
    SectionLoader,
    PageLoader,
    ComponentLoader
};