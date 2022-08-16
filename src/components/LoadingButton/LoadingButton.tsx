import React from 'react';
import { Spinner } from 'react-bootstrap';
import styled from 'styled-components';
import Button from '../Button';
import { ButtonProps } from '../Button/Button';

type LoadingButtonProps = ButtonProps & {
    children: React.ReactNode;
    disabled?: boolean;
    loading?: boolean
    fullWidth?: boolean
    loadingIndicator?: React.ReactNode
    loadingPosition?: 'start' | 'center' | 'end',
}

const LoadingButtonRoot = styled(Button)<LoadingButtonProps>(({loading, loadingPosition}) => ({
    display: 'inline-flex',
    ...(loading && {[`& .start-icon, & .end-icon`]: {opacity: 0,},}),
    ...(loadingPosition === 'center' && loading && {color: 'transparent!important',}),
    ...(loadingPosition === 'end' && loading && {
        color: 'var(--sidooh-secondary)!important',
        ['& .indicator']: {transition: '.3s',}
    }),
    ...(loadingPosition === 'start' && loading && {
        ['& .start-icon, & .end-icon']: {
            opacity: 0,
            marginRight: -8,
        },
    }),
    ...(loadingPosition === 'end' && loading && {
        [`& .start-icon, & .end-icon`]: {
            opacity: 0,
            marginLeft: -8,
        },
    }),
}));

const LoadingButtonIndicator = styled('div')<LoadingButtonProps>(({loadingPosition, fullWidth}) => ({
    position: 'absolute',
    visibility: 'visible',
    display: 'flex',
    ...(loadingPosition === 'center' && {
        left: '50%',
        transform: 'translate(-50%)',
        color: 'var(--sidooh-secondary)',
    }),
    ...(loadingPosition === 'start' && {
        position: 'relative',
        left: -10,
    }),
    ...(loadingPosition === 'end' && {
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
        loading,
        loadingIndicator,
        loadingPosition,
    };

    const loadingButtonLoadingIndicator = loading ? (
        <LoadingButtonIndicator {...ownerState} disabled={disabled} className={'indicator'}>
            {loadingIndicator}
        </LoadingButtonIndicator>
    ) : null;

    return (
        <LoadingButtonRoot id={id} type={type} className={`position-relative ${className}`}
                           disabled={disabled || loading} {...ownerState} {...rest}>
            {loadingPosition === 'end' ? children : loadingButtonLoadingIndicator}
            {loadingPosition === 'end' ? loadingButtonLoadingIndicator : children}
        </LoadingButtonRoot>
    );
};

export default LoadingButton;
