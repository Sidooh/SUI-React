import React, { memo } from 'react';
import classNames from 'classnames';

type LogoType = {
    src: string,
    serviceName?: string,
    at?: 'navbar-vertical' | 'navbar-top' | 'auth',
    width?: number
    className?: string,
    textClass?: string
}

const Logo = ({ src, at = 'auth', width = 78, className, textClass, serviceName, ...rest }: LogoType) => {
    return (
        <a href="/" className={classNames(
            'text-decoration-none',
            { 'navbar-brand text-left': at === 'navbar-vertical' },
            { 'navbar-brand text-left': at === 'navbar-top' }
        )} {...rest}>
            <div className={classNames(
                'd-flex', {
                    'align-items-center py-3': at === 'navbar-vertical',
                    'align-items-center': at === 'navbar-top',
                    'flex-center fw-bolder fs-5 mb-4': at === 'auth',
                    'flex-column': serviceName
                },
                className
            )}>
                <img className="me-2" src={src} alt="Logo" width={width}/>
                {serviceName && <h6 style={{
                    fontFamily: "'Avenir Regular', sans-serif",
                    fontWeight: 'bolder',
                    margin: `-.${width * .4}rem 0 0`,
                    fontSize: `${width * .1}pt`
                }}>{serviceName}</h6>}
            </div>
        </a>
    );
};

export default memo(Logo);
