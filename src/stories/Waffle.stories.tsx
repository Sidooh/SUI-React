import { Meta, StoryObj } from "@storybook/react";
import { Waffle } from "../components";

const meta: Meta<typeof Waffle> = {
    component: Waffle,
};

export default meta;

type Story = StoryObj<typeof Waffle>;

export const Default: Story = {
    args: {
        links: [
            {
                avatarText: 'A',
                title: 'Accounts',
                link: '/',
                contentClass: 'bg-soft-primary text-primary',
                enabled: true
            },
            {
                avatarText: 'E',
                title: 'Enterprise',
                link: `/events/event-detail`,
                contentClass: 'bg-soft-primary text-primary',
            },
            {
                avatarText: 'N',
                title: 'Notify',
                link: '/',
                contentClass: 'bg-soft-primary text-primary',
                enabled: true
            },
            {
                avatarText: 'P',
                title: 'Payments',
                link: '/',
                contentClass: 'bg-soft-primary text-primary',
                enabled: true
            },
            {
                avatarText: 'P',
                title: 'Products',
                link: '/',
                contentClass: 'bg-soft-primary text-primary',
                enabled: true
            },
            {
                avatarText: 'S',
                title: 'Savings',
                link: '/',
                contentClass: 'bg-soft-primary text-primary',
                enabled: true
            },
            {
                avatarText: 'U',
                title: 'USSD',
                link: '/',
                contentClass: 'bg-soft-primary text-primary',
                enabled: true
            },
        ]
    }
}