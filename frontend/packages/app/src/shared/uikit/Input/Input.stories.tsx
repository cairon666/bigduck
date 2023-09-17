import type { Meta, StoryObj } from '@storybook/react';
import { GiPlasticDuck } from 'react-icons/gi';
import { PasswordInput } from '@shared/uikit/Input/PasswordInput';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
    title: 'Input',
    component: Input,
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Filled: Story = {
    args: {
        label: 'example',
        placeholder: 'example',
    },
};

export const Primary: Story = {
    args: {
        ...Filled.args,
        theme: 'primary',
    },
};

export const Clear: Story = {
    args: {
        ...Filled.args,
        theme: 'clear',
    },
};

export const Required: Story = {
    args: {
        ...Filled.args,
        required: true,
    },
};

export const WithError: Story = {
    args: {
        ...Filled.args,
        error: 'example',
    },
};

export const WithRightIcon: Story = {
    args: {
        ...Filled.args,
        rightIcon: <GiPlasticDuck className="h-4 w-4" />,
    },
};

export const Password: Story = {
    render: (props) => <PasswordInput {...props} />,
    args: {
        ...Filled.args,
    },
};
