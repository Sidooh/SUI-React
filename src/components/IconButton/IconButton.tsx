import styled, { css } from 'styled-components';
import { Color } from 'react-bootstrap/types';
import { forwardRef } from "react";

export interface IconButtonProps {
    type?: "button" | "submit" | "reset";
    className?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    children: React.ReactNode;
    size?: "sm" | 'md' | "lg";
    color?: Color;
    style?: React.CSSProperties;
}

type IconButtonRootProps = {
    ref: any
    color: Color
    size: "sm" | 'md' | "lg"
}

const IconButtonRoot = styled.button<IconButtonRootProps>`
  background-color: transparent;
  color: var(--sidooh-${({ color }) => color}) !important;
  flex: 0 0 auto;
  text-align: center;
  border-radius: 50%;
  overflow: visible;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
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

  &:hover {
    background-color: rgba(var(--sidooh-${({ color }) => color}-rgb), .2);
  }

  ${({ size }) => {
    switch (size) {
      case 'sm':
        return css`
          padding: 7px;
          font-size: .9rem;
        `;
      case 'lg':
        return css`
          padding: 12px;
          font-size: 1.5rem;
        `;
      default:
        return css`
          padding: 10px;
          font-size: 1.125rem;
        `;
    }
  }}
`;

const IconButton = forwardRef(function IconButton({
    type,
    size = 'md',
    className,
    onClick,
    disabled = false,
    children,
    color = 'primary',
    style
}: IconButtonProps, ref) {
    return (
        <IconButtonRoot ref={ref} type={type} className={className} onClick={onClick} disabled={disabled}
                        style={style} color={color} size={size}>
            {children}
        </IconButtonRoot>
    );
});

export default IconButton;
