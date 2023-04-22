import { Meta, StoryObj } from "@storybook/react";
import IconButton from "../components/IconButton";
import { FaIcons } from "react-icons/all";

const meta: Meta<typeof IconButton> = {
    component: IconButton
}

export default meta

type Story = StoryObj<typeof IconButton>
export const Default: Story = {
    args: {
        children: <FaIcons/>
    },
}