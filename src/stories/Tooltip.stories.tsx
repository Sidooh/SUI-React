import { Meta, StoryObj } from "@storybook/react";
import { FaIcons } from "react-icons/all";
import { IconButton, Tooltip } from "../components";

const meta: Meta<typeof Tooltip> = {
    component: Tooltip
}

export default meta

type Story = StoryObj<typeof Tooltip>
export const Default: Story = {
    args: {
        title: 'You have purchased <b>Ksh20.00</b> airtime from your Sidooh account on 30/01/23, 7:25 PM using OTHER MPESA. You have received Ksh0.1 points.',
        placement: 'end',
        children: <IconButton><FaIcons/></IconButton>
    },
}