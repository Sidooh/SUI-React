import React from 'react';
import { Spinner } from 'react-bootstrap';
import styled from 'styled-components';
import Button from '../Button';
import { ButtonProps } from '../Button/Button';

type LoadingButtonProps = ButtonProps & {
    children: React.ReactNode;
    disabled?: boolean;
    loading?: boolean | string
    fullWidth?: boolean
    loadingIndicator?: React.ReactNode
    loadingindicator?: React.ReactNode
    loadingPosition?: 'start' | 'center' | 'end',
    loadingposition?: 'start' | 'center' | 'end',
}

const LoadingButtonRoot = styled(Button)<LoadingButtonProps>(({ loading, loadingposition }) => ({
    display: 'inline-flex',
    ...(loading && { [`& .start-icon, & .end-icon`]: { opacity: 0, }, }),
    ...(loadingposition === 'center' && loading && { color: 'transparent!important', }),
    ...(loadingposition === 'end' && loading && {
        color: 'var(--sidooh-secondary)!important',
        ['& .indicator']: { transition: '.3s', }
    }),
    ...(loadingposition === 'start' && loading && {
        ['& .start-icon, & .end-icon']: {
            opacity: 0,
            marginRight: -8,
        },
    }),
    ...(loadingposition === 'end' && loading && {
        [`& .start-icon, & .end-icon`]: {
            opacity: 0,
            marginLeft: -8,
        },
    }),
}));

const LoadingButtonIndicator = styled('div')<LoadingButtonProps>(({ loadingposition }) => ({
    position: 'absolute',
    visibility: 'visible',
    display: 'flex',
    ...(loadingposition === 'center' && {
        left: '50%',
        transform: 'translate(-50%)',
        color: 'var(--sidooh-secondary)',
    }),
    ...(loadingposition === 'start' && {
        position: 'relative',
        left: -10,
    }),
    ...(loadingposition === 'end' && {
        position: 'relative',
        right: -10,
    }),
}));

const LoadingButton = ({
    id,
    type,
    loading = false,
    disabled = false,
    children,
    className,
    loadingIndicator: loadingIndicatorProp,
    loadingPosition = 'center',
    ...rest
}: LoadingButtonProps) => {
    const loadingIndicator = loadingIndicatorProp ?? (
        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>
    );

    const ownerState = {
        loading: loading ? 'true' : undefined,
        loadingindicator: loadingIndicator,
        loadingposition: loadingPosition,
    };

    const loadingButtonLoadingIndicator = loading ? (
        <LoadingButtonIndicator {...ownerState} disabled={disabled} className={'indicator'}>
            {loadingIndicator}
        </LoadingButtonIndicator>
    ) : null;

    return (
        <LoadingButtonRoot id={id} type={type} className={`position-relative ${className}`}
                           disabled={disabled || Boolean(loading)} {...ownerState} {...rest}>
            {loadingPosition === 'end' ? children : loadingButtonLoadingIndicator}
            {loadingPosition === 'end' ? loadingButtonLoadingIndicator : children}
        </LoadingButtonRoot>
    );
};

export default LoadingButton;
