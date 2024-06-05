import { Meta, StoryObj } from '@storybook/react';
import Waffle from './Waffle';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Waffle> = {
    title: 'Waffle',
    component: Waffle,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    args: {
        //👇 The args you need here will depend on your component
        links: [
            { link: '#', avatarText: 'A', title: 'Accounts' },
            { link: '#', avatarText: 'E', title: 'Enterprise' },
            { link: '#', avatarText: 'P', title: 'Payments' },
            { link: '#', avatarText: 'P', title: 'Products' },
            { link: '#', avatarText: 'M', title: 'Merchants' },
            { link: '#', avatarText: 'N', title: 'Notify' },
            { link: '#', avatarText: 'S', title: 'Savings' },
            { link: '#', avatarText: 'U', title: 'USSD' },
        ],
    },
};

export default meta;
type Story = StoryObj<typeof Waffle>;

export const Default: Story = {};
