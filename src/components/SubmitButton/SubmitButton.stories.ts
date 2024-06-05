import { Meta, StoryObj } from "@storybook/react";
import SubmitButton from './SubmitButton';
import { AiOutlineLogin } from "react-icons/ai";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof SubmitButton> = {
    title: "SubmitButton",
    component: SubmitButton,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered'
    },
    args: {
        //👇 The args you need here will depend on your component
        text: 'Submit',
        isLoading: false,
        loadingText: 'Submitting...',
        icon: AiOutlineLogin
    },
};

export default meta;
type Story = StoryObj<typeof SubmitButton>;

export const Default: Story = {};