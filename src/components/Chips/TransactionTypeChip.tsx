import { TransactionType } from "../../utils";

const TransactionTypeChip = ({ type }: { type?: TransactionType }) => {
    let color = 'secondary'
    if (type === TransactionType.CREDIT) {
        color = 'success'
    } else if (type === TransactionType.DEBIT) {
        color = 'danger'
    }

    return <b className={`text-${color}`}>{type}</b>
};

export default TransactionTypeChip;