import React from 'react';
import { Button as BtsButton } from 'react-bootstrap';
import { ButtonProps as BtsButtonProps } from 'react-bootstrap/Button';
import styled from 'styled-components';

export type ButtonProps = BtsButtonProps & {
    children: React.ReactNode;
    disabled?: boolean;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    fullWidth?: boolean
}

const ButtonRoot = styled(BtsButton)<ButtonProps>(({loading, loadingPosition}) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    boxSizing: 'border-box',
    verticalAlign: 'middle',
    textDecoration: 'none',
    ...(loadingPosition === 'center' && loading && {
        color: 'transparent!important',
    }),
    ...(loadingPosition === 'end' && loading && {
        color: 'var(--sidooh-secondary)!important',
        ['& .indicator']: {
            transition: '.3s',
        }
    }),
}));

const ButtonStartIcon = styled('span').attrs({className: 'start-icon'})<ButtonProps>(({size}) => ({
    display: 'inherit',
    marginRight: 8,
    marginLeft: -4,
    ...(size === 'sm' && {
        marginLeft: -2,
    }),
}));

const ButtonEndIcon = styled('span').attrs({className: 'end-icon'})<ButtonProps>(({size}) => ({
    display: 'inherit',
    marginRight: -4,
    marginLeft: 8,
    ...(size === 'sm' && {
        marginRight: -2,
    }),
}));

const Button = ({
    id,
    type,
    disabled = false,
    children,
    className,
    color,
    size,
    startIcon: startIconProp,
    endIcon: endIconProp,
    ...rest
}: ButtonProps) => {
    const ownerState = {
        color,
        size,
        type,
    };

    const startIcon = startIconProp && (
        <ButtonStartIcon {...ownerState}>{startIconProp}</ButtonStartIcon>
    );

    const endIcon = endIconProp && (
        <ButtonEndIcon {...ownerState}>{endIconProp}</ButtonEndIcon>
    );

    return (
        <ButtonRoot id={id} className={`position-relative ${className}`}
                    disabled={disabled} {...ownerState} {...rest}>
            {startIcon}{children}{endIcon}
        </ButtonRoot>
    );
};

export default Button;
