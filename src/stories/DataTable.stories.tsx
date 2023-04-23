import { Meta, StoryObj } from "@storybook/react";
import { DataTable, PhoneChip, TableDate } from "../components";
import { Card } from "react-bootstrap";
import { faker } from "@faker-js/faker";
import { CellContext } from "@tanstack/react-table";
import moment from "moment";
import { getRelativeDateAndTime } from "../utils";

const meta: Meta<typeof DataTable> = {
    component: DataTable
}

export default meta

const data = Array.from({ length: 25 }, (a) => ({
    name: faker.name.firstName(),
    age: faker.datatype.number(70),
    phone: faker.phone.number('2547########'),
    created_at: faker.date.past(1),
    updated_at: faker.date.past(1)
}));
data.push({
    name: 'Tasha',
    age: 21,
    phone: '254727474615',
    created_at: moment().toDate(),
    updated_at: moment().toDate()
});

type Story = StoryObj<typeof DataTable>
export const Default: Story = {
    render: (args) => (
        <Card>
            <Card.Body>
                <DataTable {...args}/>
            </Card.Body>
        </Card>
    ),
    args: {
        title: 'Example DT',
        columns: [
            {
                accessorKey: 'account',
                header: 'Account',
                cell: ({ row: { original: a } }: CellContext<{ name: string, phone: string }, any>) => (
                    <div>
                        <a href={`#`}>{a.name} {a.name && <br/>}</a>
                        <PhoneChip phone={a.phone}/>
                    </div>
                )
            },
            { accessorKey: 'name', },
            { accessorKey: 'age' },
            {
                accessorKey: 'phone',
                cell: ({ row }: CellContext<{ phone: number }, any>) => <PhoneChip phone={row.getValue('phone')}/>
            },
            {
                accessorKey: 'created_at',
                accessorFn: (row: any) => getRelativeDateAndTime(row.created_at).toString(),
                header: 'Created',
                cell: ({ row }: CellContext<{ created_at: Date }, any>) => <TableDate date={row.original.created_at}/>
            },
        ],
        data,
        reFetching: false,
        onRefetch: () => {
            console.log('Hello')
        }
    },
}