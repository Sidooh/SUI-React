import { PaymentSubType, PaymentType, Status, TransactionType } from '@/lib/enums';

export type Model = {
    id: number;
    created_at: Date;
    updated_at: Date;
};

export type User = Model & {
    name: string;
    email: string;
    username: string;
    id_number: string;
    status: Status;
};

export type Account = Model & {
    phone: string;
    user?: User;
    user_id: number;
    active: boolean;
    telco_id: number;
    referrer_id: number;
};

export interface StkCallback extends Model {
    amount: number;
    result_desc: string;
    checkout_request_id: string;
    mpesa_receipt_number: string;
}

export interface StkRequest extends Model {
    checkout_request_id: string;
    amount: number;
    phone: number;
    reference: string;
    status: Status;
    response?: StkCallback;
}

export interface BuniStkCallback extends Model {
    amount: number;
    result_desc: string;
    merchant_request_id: string;
    mpesa_receipt_number: string;
}

export interface BuniStkRequest extends Model {
    merchant_request_id: string;
    amount: number;
    phone_number: number;
    invoice_number: string;
    status: Status;
    callback?: BuniStkCallback;
}

export interface Voucher extends Model {
    type: string;
    balance: number;
    status: Status;
    account_id: number;
    transactions?: VoucherTransaction[];
    voucher_type?: VoucherType;
    account?: Account;
}

export interface VoucherTransaction extends Model {
    type: TransactionType;
    amount: number;
    description: string;
    voucher_id: number;
    voucher?: Voucher;
}

export interface VoucherType extends Model {
    name: string;
}

export interface MpesaC2BCallback extends Model {
    transaction_type: string;
    trans_id: string;
    trans_amount: number;
    first_name: string;
    middle_name: string;
    last_name: string;
    msisdn: string;
}

export interface Payment<P = StkRequest | BuniStkRequest | VoucherTransaction | MpesaC2BCallback> extends Model {
    amount: number;
    charge: number;
    type: PaymentType;
    subtype: PaymentSubType;
    status: Status;
    description: string;
    destination_type: PaymentType;
    destination_subtype: string;
    destination_data: {
        payment_id?: number;
    };
    account?: Account;
    provider?: P;
    destination_provider?: SidoohTransaction | BulkPaymentRequest | TendePayRequest | MpesaB2BRequest;
}

export interface BulkPaymentRequest extends Model {
    amount: number;
    command_id: string;
    conversation_id: string;
    phone: string;
    remarks: string;
    response: BulkPaymentResponse;
}

export interface BulkPaymentResponse extends Model {
    result_type: number;
    result_code: number;
    result_desc: string;
    originator_conversation_id: string;
    conversation_id: string;
}

export interface FloatAccountTransaction extends Model {
    type: TransactionType;
    amount: number;
    balance: number;
    description: string;
    float_account_id: number;
    float_account?: FloatAccount;
}

export interface FloatAccount extends Model {
    account_id: number;
    balance: number;
    description: string;
    floatable_type: string;
    floatable_id: string;

    account?: Account;
    transactions?: FloatAccountTransaction[];
}

export type TendePayRequest = Model & {
    service: string;
    unique_reference: string;
    transaction_reference: string;
    text: {
        account_number: number;
        amount: number;
        pay_bill_number: number;
        source_paybill: number;
    };
    msisdn: string;
    timestamp: Date;
    response_code: string;
    response_message: string;
    successful: boolean;
    status: string;

    callback?: TendePayCallback;
};

export type TendePayCallback = Model & {
    initiator_reference: string;
    response_code: string;
    status: string;
    status_description: string;
    amount: number;
    account_reference: string;
    confirmation_code: string;
    msisdn: string;
    receiver_party_name: string;
    date: Date;
};

export type SidoohTransaction = FloatAccountTransaction | VoucherTransaction;

export type MpesaB2BRequest = Model & {
    command_id: string;
    party_a: string;
    party_b: string;
    requester: string;
    amount: number;
    account_reference: string;
    remarks?: string;
    conversation_id: string;
    original_conversation_id: string;
    response_code: string;
    response_description: string;
    relation_id?: string;

    response?: MpesaB2BResponse;
};

export type MpesaB2BResponse = Model & {
    result_type: number;
    result_code: string;
    result_desc: string;
    originator_conversation_id: string;
    conversation_id: string;
    transaction_id: string;
    debit_account_balance?: string;
    amount?: number;
    debit_party_affected_account_balance?: string;
    trans_completed_time?: string;
    debit_party_charges?: string;
    receiver_party_public_name?: string;
    currency?: string;
    initiator_account_current_balance?: string;
    debit_account_current_balance?: string;
    credit_account_balance?: string;
    debit_party_public_name?: string;
    credit_party_public_name?: string;
};

export type TandaRequest = Model & {
    request_id: number;
    receipt_number: number;
    amount: number;
    provider: string;
    message: string;
    destination: string;
    last_modified: string;
    status: number;
};

export type SavingsTransaction = Model & {
    savings_id: number;
    amount: number;
    description: string;
    type: string;
    status: Status;
    transaction: ProductsTransaction;
};

export type ProductsTransaction = Model & {
    status: Status;
    description: string;
    destination: string;
    product_id: 1 | 2 | 3 | 4 | 5 | 6;
    type: string;
    amount: number;
    charge: number;
    payment?: Payment;
    tanda_requests?: TandaRequest[];
    savings_transaction?: SavingsTransaction;
    account: Account;
};

export type Cashback = Model & {
    amount: number;
    type: string;
    transaction?: ProductsTransaction;
    account?: Account;
};

export type ProductAccount = Model & {
    provider: string;
    account_number: number;
    priority: number;
    account: Account;
};

export type SubscriptionType = Model & {
    title: string;
    price: number;
    duration: number;
    period: string;
};

export type Subscription = Model & {
    amount: number;
    start_date: string;
    end_date: string;
    account: Account;
    status: Status;
    subscription_type: SubscriptionType;
};
