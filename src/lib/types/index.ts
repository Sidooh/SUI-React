import { ComponentType } from 'react';
import { IconType } from 'react-icons';

export type DataTableDefaultProps = {
    currentServerPage?: number;
    isRefreshing?: boolean;
    onCreateRow?: () => void;
    onGoToServerPage?: (page: number) => void;
    onNextServerPage?: () => void;
    onPreviousServerPage?: () => void;
    onRefresh?: () => void;
    onSetServerPageSize?: (page: number) => void;
    serverPageCount?: number;
    serverPageSize?: number;
    serverTotal?: number;
};

export type FacetedFilterType = {
    column_id: string;
    title: string;
    options: {
        label: string;
        value: string;
        icon?: ComponentType<{ className?: string }>;
    }[];
};

export type RouteChildType = {
    name: string;
    active?: boolean;
    icon: IconType;
    to?:
        | string
        | Partial<{
              pathname: string;
              search: string;
              hash: string;
          }>;
    disabled?: boolean;
    children?: Omit<RouteChildType, 'children' | 'icon'>[];
};

export type RouteType = {
    label: string;
    children: RouteChildType[];
};

export type RawAnalytics = {
    date: string | number;
    [key: string]: string | number;
};

export type LoginResponse = { access_token: string };
export type LoginRequest = {
    email: string;
    password: string;
};

export interface ApiResponse<T> {
    status: string;
    data: T;
}

export interface PaginationState {
    page: number;
    page_size: number;
}

export interface PaginatedResponse<T> {
    data: T;
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
}
