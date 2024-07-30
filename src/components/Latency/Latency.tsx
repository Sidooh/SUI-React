import moment from 'moment';

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

    let color = '#1f7503';
    if (latInSec > 30) color = '#dc2626';
    if (latInSec > 7 && latInSec <= 30) color = '#eab308';

    return (
        <span style={{ color }} className={'font-bold'}>
            {Math.floor(latency)}
            {unit}
        </span>
    );
};

export default Latency;
