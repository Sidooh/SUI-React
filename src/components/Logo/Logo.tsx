import React, { memo } from 'react';
import classNames from 'classnames';

type LogoType = {
    src?: string,
    at?: 'navbar-vertical' | 'navbar-top' | 'auth',
    width?: number
    className?: string,
    textClass?: string
}

const Logo = ({src, at = 'auth', width = 78, className, textClass, ...rest}: LogoType) => {
    return (
        <a href="/" className={classNames(
            'text-decoration-none',
            {'navbar-brand text-left': at === 'navbar-vertical'},
            {'navbar-brand text-left': at === 'navbar-top'}
        )} {...rest}>
            <div className={classNames(
                'd-flex', {
                    'align-items-center py-3': at === 'navbar-vertical',
                    'align-items-center': at === 'navbar-top',
                    'flex-center fw-bolder fs-5 mb-4': at === 'auth'
                },
                className
            )}>
                <img className="me-2" src={src} alt="Logo" width={width}/>
            </div>
        </a>
    );
};

export default memo(Logo);
