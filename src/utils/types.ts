import { Status } from './enums';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export type Model = {
    id: number
    created_at: string
    updated_at: string
}

export type User = Model & {
    name: string
    email: string
    username: string
    id_number: string
    status: Status
}

export type Account = Model & {
    phone: string
    user?: User
    user_id: number,
    active: boolean
    telco_id: number
    referrer_id: number
}

export interface ApiResponse<T> {
    status: string;
    data: T;
}

export type RouteChildType = {
    name: string
    active: boolean
    icon?: IconProp
    to?: string
    exact?: boolean
    badge?: {
        text?: string
        type?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark',
    }
    children?: RouteChildType[]
}

export type RouteType = {
    label: string
    labelDisable?: boolean
    children: RouteChildType[]
}

export type RawAnalytics = {
    date: number
    count: number
}
