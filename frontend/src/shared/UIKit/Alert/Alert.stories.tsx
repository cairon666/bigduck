import { Meta, StoryObj } from '@storybook/react';

import { Alert } from './Alert';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Alert> = {
    title: 'Alert',
    component: Alert,
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const All: Story = {
    render: (props) => {
        return (
            <div className={'flex flex-col gap-2 p-4'}>
                <Alert {...props} theme={'info'} />
                <Alert {...props} theme={'danger'} />
                <Alert {...props} theme={'success'} />
                <Alert {...props} theme={'warning'} />
                <Alert {...props} theme={'dark'} />
            </div>
        );
    },
    args: {
        children: 'Something happened',
    },
};

export const Info: Story = {
    args: {
        theme: 'info',
        children: 'Something happened',
    },
};

export const Danger: Story = {
    args: {
        theme: 'danger',
        children: 'Something happened',
    },
};

export const Success: Story = {
    args: {
        theme: 'success',
        children: 'Something happened',
    },
};

export const Warning: Story = {
    args: {
        theme: 'warning',
        children: 'Something happened',
    },
};

export const Dark: Story = {
    args: {
        theme: 'dark',
        children: 'Something happened',
    },
};
