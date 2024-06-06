import { Meta, StoryObj } from '@storybook/react';
import DataTable from './DataTable';
import { faker } from '@faker-js/faker/locale/en';
import { ColumnDef } from '@tanstack/react-table';
import TableDate from '@/components/TableDate';
import Tooltip from '@/components/Tooltip';
import IconButton from '@/components/IconButton/IconButton';
import { MdReadMore } from 'react-icons/md';
import SidoohAccount from '@/components/SidoohAccount/SidoohAccount';
import { Account, User } from '@/lib/types/models';
import { getRelativeDateAndTime } from '@/lib';

type TableData = { id: number; name: string; age: number; created_at: Date; updated_at: Date; account: Account };

const columns: ColumnDef<TableData>[] = [
    {
        accessorKey: 'account',
        header: 'Account',
        cell: ({ row: { original } }) => <SidoohAccount account={original.account} />,
    },
    { header: 'Name', accessorKey: 'name' },
    { header: 'Age', accessorKey: 'age' },
    {
        accessorKey: 'created_at',
        accessorFn: (row: any) => getRelativeDateAndTime(row.created_at).toString(),
        header: 'Created',
        cell: ({ row }) => <TableDate date={row.original.created_at} />,
    },
    {
        id: 'actions',
        cell: ({ row }) => (
            <a href={`/${row.original.id}`}>
                <Tooltip title={'View'} asChild>
                    <IconButton icon={MdReadMore} dimensions={20} iconSize={12} />
                </Tooltip>
            </a>
        ),
    },
];

const data: TableData[] = Array.from({ length: 30 }, (a, i) => ({
    id: i + 1,
    name: faker.name.firstName(),
    age: faker.datatype.number(70),
    account: {
        id: i + 1,
        phone: faker.phone.number('2547########'),
        user: {
            id: i + 1,
            name: faker.name.fullName(),
        } as User,
    } as Account,
    created_at: faker.date.past(1),
    updated_at: faker.date.past(1),
}));

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof DataTable> = {
    title: 'DataTable',
    component: DataTable,
    tags: ['autodocs'],
    args: {
        //👇 The args you need here will depend on your component
        title: 'DataTable',
        data,
        columns: columns as ColumnDef<unknown>[],
        isRefreshing: false,
        onRefresh: () => console.log('Handle Refresh'),
        serverTotal: data.length,
        serverPageCount: 5,
        currentServerPage: 1,
        onPreviousServerPage: () => console.log('Handle Go to Previous Server Page'),
        onNextServerPage: () => console.log('Handle Go to Next Server Page'),
        onGoToServerPage: (p) => console.log(`Handle Go to Server Page: ${p}`),
        onSetServerPageSize: (n) => console.log(`Handle Set Server Page Size: ${n}`),
    },
};

export default meta;

type Story = StoryObj<typeof DataTable>;

export const Advanced: Story = {};
