import moment from 'moment';
import { cn } from '@/lib/utils';

type LatencyProps = {
    from: Date;
    to: Date;
};

export const calcLatency = (from: Date, to: Date) => Math.abs(moment(to).diff(from, 's'));

const Latency = ({ from, to }: LatencyProps) => {
    let unit = 's',
        latInSec = calcLatency(from, to),
        latency = latInSec;

    if (latInSec > 2628288) {
        unit = 'mo';
        latency = latency / 2628288;
    } else if (latInSec > 86400) {
        unit = 'd';
        latency = latency / 86400;
    } else if (latInSec >= 3600) {
        unit = 'hrs';
        latency = latency / 3600;
    } else if (latInSec >= 60) {
        unit = 'min';
        latency = latency / 60;
    }

    return (
        <span
            className={cn(`font-bold`, {
                'text-red-600': latInSec > 30,
                'text-yellow-500': latInSec > 7 && latInSec <= 30,
                'text-[#1f7503]': latInSec <= 7,
            })}
        >
            {Math.floor(latency)}
            {unit}
        </span>
    );
};

export default Latency;
