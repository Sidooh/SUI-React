import styled, { css } from "styled-components";
import { FC, ReactNode } from "react";

type TooltipProps = {
    title: ReactNode;
    children: ReactNode;
    placement?: "top" | "bottom" | "start" | "end";
};

type TooltipWrapperProps = {
    placement?: "top" | "bottom" | "start" | "end";
    backgroundColor: string;
};

const TooltipWrapper = styled.div<TooltipWrapperProps>`
  display: inline-block;
  position: relative;
  z-index: 1;

  &:hover span {
    visibility: visible;
    opacity: 1;
  }

  span {
    visibility: hidden;
    font-size: 9pt;
    color: #fff;
    background-color: rgba(97, 97, 97, 0.9);
    border-radius: 4px;
    padding: 4px 8px;
    position: absolute;
    z-index: 1;
    opacity: 0;
    transition: opacity 0.2s ease-out, visibility 0.2s ease-out;
    max-width: 300px;
    pointer-events: none;
    width: max-content;

    ${(props) => props.placement === "top" && css`
      bottom: 125%;
      left: 50%;
      transform: translateX(-50%);
    `}
    ${(props) => props.placement === "bottom" && css`
      top: 125%;
      left: 50%;
      transform: translateX(-50%);
    `}
    ${(props) => props.placement === "start" && css`
      top: 50%;
      right: 125%;
      transform: translateY(-50%);
    `}
    ${(props) => props.placement === "end" && css`
      top: 50%;
      left: 125%;
      transform: translateY(-50%);
    `}
  }
`;

const Tooltip: FC<TooltipProps> = ({ title, placement = "top", children }) => {
    return (
        <TooltipWrapper placement={placement} backgroundColor="rgba(97, 97, 97, 0.9)">
            {children} {title && <span dangerouslySetInnerHTML={{ __html: title }}/>}
        </TooltipWrapper>
    );
};

export default Tooltip;