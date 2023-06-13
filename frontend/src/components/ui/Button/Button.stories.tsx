import type { Meta, StoryObj } from '@storybook/react';
import { FaFontAwesome } from 'react-icons/all';

import { Button, ButtonProps } from './Button';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Button> = {
    title: 'Button',
    component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

const ContainerForButton = (args: ButtonProps) => {
    return (
        <div className={'flex w-max flex-col gap-2'}>
            <Button {...args} />
            <Button {...args} disabled />
            <Button {...args} isLoading />
            <Button {...args} isLoading disabled />
            <Button {...args} onlyIcon>
                {/* need set height and weight*/}
                <FaFontAwesome className={'h-4 w-4'} />
            </Button>
        </div>
    );
};

export const Contained: Story = {
    render: ContainerForButton,
    args: {
        theme: 'contained',
        children: 'example',
    },
};

export const Outlined: Story = {
    render: ContainerForButton,
    args: {
        theme: 'outlined',
        children: 'example',
    },
};

export const Text: Story = {
    render: ContainerForButton,
    args: {
        theme: 'text',
        children: 'example',
    },
};

export const Gray: Story = {
    render: ContainerForButton,
    args: {
        theme: 'gray',
        children: 'example',
    },
};
