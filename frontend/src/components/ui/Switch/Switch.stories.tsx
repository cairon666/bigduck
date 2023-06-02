import type { Meta, StoryObj } from '@storybook/react';
import { FaFortAwesome } from 'react-icons/fa';

import { Switch, SwitchItem } from './Switch';

const meta: Meta<typeof Switch> = {
    title: 'Switch',
    component: Switch,
};

export default meta;
type Story = StoryObj<typeof Switch>;

const items: SwitchItem<number>[] = [
    {
        label: 'example',
        value: 0,
    },
    {
        label: 'with icon',
        value: 1,
        icon: FaFortAwesome,
    },
];

export const Default: Story = {
    args: {
        items: items,
    },
};

export const WithInitValue: Story = {
    args: {
        items: items,
        initActive: items[0].value,
    },
};
