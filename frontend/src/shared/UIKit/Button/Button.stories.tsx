import type { Meta, StoryObj } from "@storybook/react";
import { GiPlasticDuck } from "react-icons/gi";

import { Button } from "./Button";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Button> = {
    title: "Button",
    component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Contained: Story = {
    args: {
        theme: "contained",
        children: "example",
    },
};

export const Outlined: Story = {
    args: {
        theme: "outlined",
        children: "example",
    },
};

export const Text: Story = {
    args: {
        theme: "text",
        children: "example",
    },
};

export const Gray: Story = {
    args: {
        theme: "gray",
        children: "example",
    },
};

export const OnlyIcon: Story = {
    render: (props) => {
        return <Button {...props}></Button>;
    },
    args: {
        theme: "contained",
        children: <GiPlasticDuck className={"h-4 w-4"} />,
        onlyIcon: true,
    },
};
