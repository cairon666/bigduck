import type { Meta, StoryObj } from '@storybook/react';
import { Loader } from './Loader';

const meta: Meta<typeof Loader> = {
    title: 'Loader',
    component: Loader,
};

export default meta;
type Story = StoryObj<typeof Loader>;

export const Small: Story = {
    args: {
        size: 'small',
    },
};

export const Medium: Story = {
    args: {
        size: 'medium',
    },
};

export const Large: Story = {
    args: {
        size: 'large',
    },
};
