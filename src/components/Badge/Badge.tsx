import React, { CSSProperties, memo, MouseEventHandler, ReactNode } from 'react';
import classNames from 'classnames';
import { Color } from 'react-bootstrap/types';

type SoftBadgeProps = {
    bg?: Color,
    pill?: boolean,
    children: ReactNode,
    className?: string
    style?: CSSProperties;
    soft?: boolean;
    icon?: ReactNode;
    onClick?: MouseEventHandler<HTMLSpanElement>
};

const Badge = ({ bg = 'primary', pill, children, icon, soft = false, className, style, onClick }: SoftBadgeProps) => {
    return (
        <span className={classNames(className, `badge ${soft ? 'badge-soft' : 'bg'}-${bg}`, {
            'rounded-pill': pill,
            'text-primary': !soft && bg === 'success'
        })}
              style={style} onClick={onClick}>
            {icon} {children}
        </span>
    );
};

export default memo(Badge);
