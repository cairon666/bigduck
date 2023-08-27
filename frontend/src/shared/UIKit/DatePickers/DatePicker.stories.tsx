import { DefaultDatePicker } from '@/shared/UIKit';
import type { Meta, StoryObj } from '@storybook/react';

import { DatePicker } from './DatePicker';

const meta: Meta<typeof DatePicker> = {
    title: 'DatePicker',
    component: DatePicker,
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
    render: (props) => (
        <div className={'w-max'}>
            <DatePicker {...props} />
        </div>
    ),
    args: {
        children: <DefaultDatePicker />,
    },
};
