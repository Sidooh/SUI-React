import Phone from '@/components/Phone/Phone';
import { Account } from '@/lib/types/models';

type UserAccountProps = { account?: Account; url?: string };

const SidoohAccount = ({ account, url }: UserAccountProps) => {
    if (!account) return <>-</>;

    return (
        <p>
            {account?.user?.name} {account?.user?.name && <br />}
            <a href={url} target={'_blank'} className={'text-sm'}>
                <Phone phone={account.phone} />
            </a>
        </p>
    );
};

export default SidoohAccount;
