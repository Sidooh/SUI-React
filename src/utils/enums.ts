export enum Status {
    ACTIVE = 'ACTIVE',
    COMPLETED = 'COMPLETED',
    EXPIRED = 'EXPIRED',
    FAILED = 'FAILED',
    INACTIVE = 'INACTIVE',
    PAID = 'PAID',
    PENDING = 'PENDING',
    REFUNDED = 'REFUNDED',
}

export enum Telco {
    AIRTEL = 'AIRTEL',
    EQUITEL = 'EQUITEL',
    FAIBA = 'FAIBA',
    SAFARICOM = 'SAFARICOM',
    TELKOM = 'TELKOM',
}

export enum TransactionType {
    CREDIT = 'CREDIT',
    DEBIT = 'DEBIT',
    CHARGE = 'CHARGE',
}

export enum Period {
    LAST_24_HOURS = 'last_24_hours',
    LAST_SEVEN_DAYS = 'last_7_days',
    LAST_THIRTY_DAYS = 'last_30_days',
    LAST_THREE_MONTHS = 'last_3_months',
    LAST_SIX_MONTHS = 'last_6_months',
    YTD = 'ytd',
}

export enum Frequency {
    HOURLY = 'HOURLY',
    DAILY = 'DAILY',
    WEEKLY = 'WEEKLY',
    MONTHLY = 'MONTHLY',
    QUARTERLY = 'QUARTERLY',
    YEARLY = 'YEARLY'
}