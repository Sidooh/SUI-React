import React, { ReactNode, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

type Position = 'top' | 'left' | 'bottom' | 'right'

type TooltipProps = {
    title: ReactNode
    children: ReactNode
    placement?: Position
}

const TooltipWrapper = styled.div`
  position: relative;
  display: inline-flex;
`;

const TooltipTarget = styled.span<{ showOnFocus: boolean }>`
  border: none;
  background: none;
  padding: 5px;
  margin: -1px;
  color: inherit;
  cursor: inherit;
  display: flex;
  font-size: inherit;
  ${({ showOnFocus }) => !showOnFocus && css`outline: none`}
`;

const CenterContainer = styled.div<{ placement: Position }>`
  position: absolute;
  width: 200px;
  margin-left: -100px;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;

  ${({ placement }) => {
    switch (placement) {
      case 'bottom':
        return css`
          top: calc(100% + 5px);
          left: 50%;
        `;
      case 'left':
        return css`
          margin-left: 0;
          top: 50%;
          transform: translateY(-50%);
          right: calc(100% + 5px);
          width: max-content;
        `;
      case 'right':
        return css`
          margin-left: 0;
          top: 50%;
          transform: translateY(-50%);
          left: calc(100% + 5px);
          width: max-content;
        `;
      default:
        return css`
          bottom: calc(100% + 5px);
          left: 50%;
        `;
    }
  }}
`;

const TooltipBox = styled.span<{ placement: Position }>`
  position: relative;
  background-color: rgba(var(--sidooh-dark-rgb), .7);
  color: #fff;
  text-align: center;
  border-radius: .3rem;
  padding: 10px 8px;
  font-size: 14px;
  box-shadow: var(--sidooh-box-shadow);

  &:after {
    content: '';
    position: absolute;
    width: 1px;
    height: 1px;
    border-width: 5px;
    border-style: solid;
    border-color: rgba(var(--sidooh-dark-rgb), .7) transparent transparent transparent;

    ${({ placement }) => {
      switch (placement) {
        case 'bottom':
          return css`
            border-color: transparent transparent rgba(var(--sidooh-dark-rgb), .7) transparent;
            bottom: 100%;
            left: calc(50% - 5px);
          `;
        case 'left':
          return css`
            border-color: transparent transparent transparent rgba(var(--sidooh-dark-rgb), .7);
            left: 100%;
            top: calc(50% - 5px);
          `;
        case 'right':
          return css`
            border-color: transparent rgba(var(--sidooh-dark-rgb), .7) transparent transparent;
            right: 100%;
            top: calc(50% - 5px);
          `;
        default:
          return css`
            top: 100%;
            left: calc(50% - 4.5px);
          `;
      }
    }}
  }
`;

const Tooltip = ({ title, children, placement = 'bottom' }: TooltipProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const show = isHovered || isFocused;

    const targetRef = useRef(null);

    return (
        <TooltipWrapper>
            <TooltipTarget ref={targetRef} onMouseEnter={() => setIsHovered(true)}
                           onMouseLeave={() => setIsHovered(false)}
                           onFocus={() => setIsFocused(true)}
                           onBlur={() => setIsFocused(false)} showOnFocus={isFocused}>{children}</TooltipTarget>
            {show && (
                <CenterContainer placement={placement}>
                    <TooltipBox placement={placement}>{title}</TooltipBox>
                </CenterContainer>
            )}
        </TooltipWrapper>
    );
};

export default Tooltip;
