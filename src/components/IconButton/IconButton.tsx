import { Button } from 'react-bootstrap';
import React from 'react';

export interface IconButtonProps {
    type?: "button" | "submit" | "reset";
    className?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    children?: React.ReactNode;
    size?: "sm" | "lg";
}

const IconButton = ({type, size, className, onClick, disabled, children}: IconButtonProps) => {
    return (
        <Button size={size} type={type} className={`${className}`} onClick={onClick} disabled={disabled}>
            {children}
        </Button>
    );
};

export default IconButton;
