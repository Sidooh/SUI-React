import { MdError } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { FiRepeat } from 'react-icons/fi';

type ErrorFallbackType = {
    error: Error | any;
    resetErrorBoundary?: () => void;
};

const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackType) => {
    console.error(error);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (error instanceof Error) {
            setMessage(error.message);
        } else if ('data' in error) {
            setMessage((error.data as { detail: string }).detail);
        } else {
            setMessage('Something went wrong!');
        }
    }, [error]);

    return (
        <section className="py-0 text-center space-y-2">
            {error && (
                <div className="border border-dashed border-red-700 p-3 space-y-2">
                    <div className="flex items-center justify-center gap-3 text-gray-700">
                        <MdError className="text-red-700" />
                        <span>
                            <b>Oops!</b> {message}
                        </span>
                    </div>

                    {resetErrorBoundary && (
                        <Button variant={'outline'} className={'text-gray-400'} onClick={resetErrorBoundary}>
                            Retry
                            <FiRepeat className={'ms-2'} />
                        </Button>
                    )}
                </div>
            )}
        </section>
    );
};

export default ErrorFallback;
