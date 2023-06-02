import type { Meta, StoryObj } from '@storybook/react';

import { PageHeader, PageHeaderProps } from '../PageHeader';
import { WithRightSide } from '../PageHeader/PageHeader.stories';
import { Card } from './Card';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Card> = {
    title: 'Card',
    component: Card,
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
    args: {
        children: <div>example</div>,
    },
};

export const WithSomeContent: Story = {
    render: () => {
        return (
            <Card>
                <PageHeader {...(WithRightSide.args as PageHeaderProps)} />
                <div className={'px-2'}>example content</div>
            </Card>
        );
    },
};
