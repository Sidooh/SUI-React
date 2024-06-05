import { Meta, StoryObj } from "@storybook/react";
import IconButton from './IconButton';
import { GiMoneyStack } from "react-icons/gi";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof IconButton> = {
    title: "IconButton",
    component: IconButton,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered'
    },
    args: {
        icon: GiMoneyStack,
        variant: 'outline',
    },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {};