import type { Meta, StoryObj } from '@storybook/react';

import { Input } from './Input';

const meta: Meta<typeof Input> = {
    title: 'Input',
    component: Input,
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
    args: {},
};

export const FullWidth: Story = {
    args: {
        fullWidth: true,
    },
};

export const WithLabel: Story = {
    args: {
        label: 'example',
    },
};

export const WithError: Story = {
    args: {
        errorLabel: 'example',
    },
};

export const WithErrorAndLabel: Story = {
    args: {
        label: 'example',
        errorLabel: 'example',
    },
};
