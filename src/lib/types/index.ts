import { ComponentType } from 'react';
import { IconType } from 'react-icons';

export type DataTableDefaultProps = {
    currentServerPage?: number;
    isRefreshing?: boolean;
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
