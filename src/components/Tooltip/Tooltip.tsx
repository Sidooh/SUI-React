import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';

type Position = 'top' | 'left' | 'bottom' | 'right'

type TooltipProps = {
    title: ReactNode
    children: ReactNode
    placement?: Position
}

const TooltipTooltip = styled.span<{ placement: Position }>`
  position: relative;

  &:after {
    /*  The arrow */
    content: "";
    position: absolute;
    display: none;
    border: 7px solid transparent;
  }

  ${props => {
    switch (props.placement) {
      case 'top':
        return css`
          & div {
            bottom: 100%;
            margin-bottom: 7px;
          }

          &:after {
            left: 50%;
            bottom: 100%;
            margin-bottom: -7px;
            transform: translateX(-50%);
            border-top-color: rgba(15, 27, 76, .7);
          }
        `;
      case 'right':
        return css`
          & div {
            top: 50%;
            left: 100%;
            margin-left: 7px;
            transform: translateY(-50%);
          }

          &:after {
            top: 50%;
            left: 100%;
            margin-left: -7px;
            transform: translateY(-50%);
            border-right-color: rgba(15, 27, 76, .7);
          }
        `;
      case 'left':
        return css`
          & div {
            top: 50%;
            right: 100%;
            margin-right: 7px;
            transform: translateY(-50%);
          }

          &:after {
            top: 50%;
            right: 100%;
            margin-right: -7px;
            transform: translateY(-50%);
            border-left-color: rgba(15, 27, 76, .7);
          }
        `;
      default:
        return css`
          & div {
            top: 100%;
            margin-top: 7px;
          }

          &:after {
            top: 100%;
            left: 50%;
            margin-top: -7px;
            transform: translateX(-50%);
            border-bottom-color: rgba(15, 27, 76, .7);
          }
        `;
    }
  }}
  
  &:hover div, &:hover:after {
    display: block;
  }
`;

const TooltipText = styled.div`
  position: absolute;
  width: 15rem;
  font-size: 11px;
  padding: 4px 8px;
  border-radius: 10px;
  background: rgba(15, 27, 76, .7);
  color: #fff;
  text-align: center;
  display: none;
  word-wrap: break-word;
  z-index: 999;
`;

const Tooltip = ({ title, children, placement = 'bottom' }: TooltipProps) => {
    return (
        <TooltipTooltip placement={placement}>
            {children}
            <TooltipText>{title}</TooltipText>
        </TooltipTooltip>
    );
};

export default Tooltip;
