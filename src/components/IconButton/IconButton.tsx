import * as React from 'react';
import { forwardRef, ReactNode } from 'react';
import { Button, ButtonProps } from '../ui/button';
import { IconType } from 'react-icons';
import { cn } from '@/lib';
import { IconProps } from '@radix-ui/react-icons/dist/types';

interface IconButtonProps extends ButtonProps {
    icon?: IconType | React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>;
    iconSize?: string | number;
    dimensions?: string | number;
    children?: ReactNode;
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
    (
        {
            icon: Icon,

            className,
            iconSize,
            dimensions,
            children,
            ...props
        },
        ref
    ) => (
        <Button
            ref={ref}
            size={'icon'}
            className={cn(`rounded-full`, className)}
            style={{ width: dimensions, height: dimensions }}
            {...props}
        >
            {Icon ? <Icon size={iconSize} /> : children}
        </Button>
    )
);

IconButton.displayName = 'IconButton';

export default IconButton;
