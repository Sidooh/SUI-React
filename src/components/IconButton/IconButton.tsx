import styled, { css } from 'styled-components';
import { Color } from 'react-bootstrap/types';
import { CSSProperties, forwardRef, MouseEventHandler, ReactNode } from "react";
import { Spinner } from "react-bootstrap";

export interface IconButtonProps {
    type?: "button" | "submit" | "reset";
    className?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    children: ReactNode;
    size?: "sm" | 'md' | "lg";
    color?: Color;
    style?: CSSProperties;
    loading?: boolean;
    shadow?: 'none' | 'sm' | 'lg'
}

type IconButtonRootProps = {
    ref: any
    color: Color
    size: "sm" | 'md' | "lg"
    loading?: boolean;
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
          padding: 7px;
          font-size: 1.125rem;
        `;
    }
  }}

  ${({ loading }) => loading && `
    position: relative;

    & > span {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  `}
`;

const IconButton = forwardRef(function IconButton({
    type,
    size = 'md',
    className,
    onClick,
    disabled = false,
    children,
    color = 'primary',
    loading = false,
    style,
    shadow = 'none'
}: IconButtonProps, ref) {
    return (
        <IconButtonRoot ref={ref} type={type} className={`btn ${className}`}
                        onClick={onClick} disabled={disabled} style={style} color={color} size={size} loading={loading}>
            {loading ? (
                <Spinner animation="border" size="sm" variant={color}/>
            ) : children}
        </IconButtonRoot>
    );
});

export default IconButton;
