// 👇 This default export determines where your story goes in the story list
import { Meta, StoryObj } from '@storybook/react';
import { FindSelectItems, Select, SelectItemValue, SelectItems } from '@shared/uikit';

const meta: Meta<typeof Select> = {
    title: 'Select',
    component: Select,
};

export default meta;
type Story = StoryObj<typeof Select>;

const items: SelectItemValue[] = [
    {
        value: 'test 1',
        label: 'test 1',
    },
    {
        value: 'test 2',
        label: 'test 2',
    },
    {
        value: 'test 3',
        label: 'test 3',
    },
    {
        value: 'test 4',
        label: 'test 4',
    },
    {
        value: 'test 5',
        label: 'test 5',
    },
    {
        value: 'test 6',
        label: 'test 6',
    },
    {
        value: 'test 7',
        label: 'test 7',
    },
];

export const Default: Story = {
    args: {
        inputProps: {
            placeholder: 'placeholder',
        },
        children: <SelectItems items={items} />,
    },
};

export const Find: Story = {
    args: {
        inputProps: {
            placeholder: 'placeholder',
        },
        children: <FindSelectItems findInputProps={{ placeholder: 'Find' }} items={items} />,
    },
};

export const InitValue: Story = {
    args: {
        inputProps: {
            placeholder: 'placeholder',
        },
        initValue: items[0],
        children: <SelectItems items={items} />,
    },
};
