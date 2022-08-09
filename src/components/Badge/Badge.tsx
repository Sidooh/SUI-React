import React, { CSSProperties, memo, MouseEventHandler, ReactNode } from 'react';
import classNames from 'classnames';

type SoftBadgeProps = {
    bg?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark',
    pill?: boolean,
    children: ReactNode,
    className?: string
    style?: CSSProperties;
    soft?: boolean;
    icon?: ReactNode;
    onClick?: MouseEventHandler<HTMLSpanElement>
};

const Badge = ({bg = 'primary', pill, children, icon, soft = false, className, style, onClick}: SoftBadgeProps) => {
    return (
        <span className={classNames(className, `badge ${soft ? 'badge-soft' : 'bg'}-${bg}`, {'rounded-pill': pill})}
              style={style} onClick={onClick}>
            {icon} <b className={'ms-1'}>{children}</b>
        </span>
    );
};

export default memo(Badge);
