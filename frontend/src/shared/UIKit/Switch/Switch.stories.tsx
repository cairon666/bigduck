import { SwitchButton } from '@/shared/UIKit';
import type { Meta, StoryObj } from '@storybook/react';
import { FaFortAwesome } from 'react-icons/fa';

import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
    title: 'Switch',
    component: Switch,
};

export default meta;
type Story = StoryObj<typeof Switch>;

const items = [
    {
        label: 'example',
        value: '0',
    },
    {
        label: 'reset',
        value: undefined,
    },
    {
        label: 'with icon',
        value: '1',
        icon: FaFortAwesome,
    },
];

export const Default: Story = {
    args: {
        children: items.map((item) => {
            return (
                <SwitchButton key={item.value} value={item.value}>
                    {item.label}
                </SwitchButton>
            );
        }),
    },
};

export const WithInitValue: Story = {
    args: {
        children: items.map((item) => {
            return (
                <SwitchButton isInit={item.value === items[0].value} key={item.value} value={item.value}>
                    {item.label}
                </SwitchButton>
            );
        }),
    },
};
