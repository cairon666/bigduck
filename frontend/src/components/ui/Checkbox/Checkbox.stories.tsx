import type { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
    title: 'Checkbox',
    component: Checkbox,
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
    render: (args) => {
        return (
            <div className='flex w-max flex-col gap-2'>
                <Checkbox {...args} />
                <Checkbox {...args} checked />
                <Checkbox {...args} disabled />
                <Checkbox {...args} label={'some label'} />
            </div>
        );
    },
    args: {},
};
