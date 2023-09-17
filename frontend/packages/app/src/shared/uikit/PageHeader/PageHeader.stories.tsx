import type { Meta, StoryObj } from '@storybook/react';
import { FaFortAwesome } from 'react-icons/fa';
import { WithInitValue } from '@shared/uikit/Switch/Switch.stories';
import { Switch } from '../Switch';
import { PageHeader } from './PageHeader';

const meta: Meta<typeof PageHeader> = {
    title: 'PageHeader',
    component: PageHeader,
};

export default meta;
type Story = StoryObj<typeof PageHeader>;

export const Default: Story = {
    args: {
        label: 'example',
    },
};

export const WithIcon: Story = {
    args: {
        label: 'example',
        left: <FaFortAwesome className="h-2 w-2" />,
    },
};

export const WithRightSide: Story = {
    args: {
        label: 'example',
        left: <FaFortAwesome className="h-2 w-2" />,
        right: <Switch {...WithInitValue.args} />,
    },
};
