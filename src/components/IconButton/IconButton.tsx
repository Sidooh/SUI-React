import { Button } from 'react-bootstrap';
import React from 'react';

export interface IconButtonProps {
    type?: "button" | "submit" | "reset";
    className?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    children?: React.ReactNode;
    size?: "sm" | "lg";
    backgroundColor?: string;
    color?: string;
    style?: React.CSSProperties;
}

const IconButton = ({type, size, className, onClick, disabled, children, backgroundColor, color, style}: IconButtonProps) => {
    let _style:React.CSSProperties = style || {};

    if (backgroundColor) _style.backgroundColor = backgroundColor;
    if (color) _style.color = color;

    return (
        <Button size={size} type={type} className={`${className}`} onClick={onClick} disabled={disabled}>
            {children}
        </Button>
    );
};

export default IconButton;
