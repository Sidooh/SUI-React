import React from 'react';
import styled from 'styled-components';

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

const Button = styled.button`
  background-color: transparent;
  color: rgba(0, 0, 0, 0.54)!important;
  flex: 0 0 auto;
  text-align: center;
  padding: 5px;
  border-radius: 50%;
  overflow: visible;
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border: none;
  outline: none;
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  margin: 0;
  cursor: pointer;
  vertical-align: middle;
  font-size: 1.125rem;

  &:hover {
    color: #000!important;
  }
`;

const IconButton = ({
    type,
    size,
    className,
    onClick,
    disabled,
    children,
    backgroundColor,
    color = '#000',
    style
}: IconButtonProps) => {
    let _style: React.CSSProperties = {
        ...style
    };

    if (backgroundColor) _style.backgroundColor = backgroundColor;
    if (color) _style.color = color;

    return (
        <Button type={type} className={className} onClick={onClick} disabled={disabled} style={_style}>
            {children}
        </Button>
    );
};

export default IconButton;
