import { ButtonHTMLAttributes, ElementType, MouseEvent, ReactNode } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { ButtonVariant } from "react-bootstrap/types";

type LoadingButtonProps<T extends ElementType = 'button'> =
    ButtonHTMLAttributes<T> & {
    loading?: boolean;
    loadingPosition?: 'start' | 'end';
    variant?: ButtonVariant;
    color?: string;
    component?: T;
    disableElevation?: boolean;
    disableFocusRipple?: boolean;
    fullWidth?: boolean;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    size?: 'sm' | 'lg';
};

const LoadingButton = <T extends keyof JSX.IntrinsicElements = 'button'>({
    loading = false,
    loadingPosition = 'start',
    variant = 'primary',
    color,
    component = 'button' as T,
    disableElevation = false,
    disableFocusRipple = false,
    fullWidth = false,
    startIcon,
    endIcon,
    size,
    children,
    ...props
}: LoadingButtonProps<T>) => {
    const buttonColor = color ?? variant;

    const handleClick = (event: MouseEvent<T>) => {
        if (!loading) {
            props.onClick?.(event);
        }
    }

    const loadingContent = (
        <Spinner animation="border" size="sm" className={loadingPosition === 'start' ? 'me-2' : 'ms-2'}/>
    );

    return (
        <Button
            variant={variant}
            as={component}
            className={`btn-${buttonColor}`}
            disabled={loading}
            onClick={handleClick as any}
            size={size}
            {...props as any}>
            {loadingPosition === 'start' && loading ? loadingContent : null}
            {loading && !loadingPosition && !startIcon ? loadingContent : null}
            {startIcon && !loading ? <span className="me-2">{startIcon}</span> : null}
            {children}
            {endIcon && !loading ? <span className="ms-2">{endIcon}</span> : null}
            {loadingPosition === 'end' && loading ? loadingContent : null}
            {loading && !loadingPosition && endIcon ? loadingContent : null}
        </Button>
    );
}

export default LoadingButton