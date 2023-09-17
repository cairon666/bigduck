// 👇 This default export determines where your story goes in the story list
import { Meta, StoryObj } from '@storybook/react';
import { Avatar } from '@shared/uikit';

const meta: Meta<typeof Avatar> = {
    title: 'Avatar',
    component: Avatar,
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Empty: Story = {
    args: {},
};

export const Text: Story = {
    args: {
        firstName: 'test',
    },
};

export const Image: Story = {
    args: {
        avatarURL:
            'https://hips.hearstapps.com/hmg-prod/images/beautiful-smooth-haired-red-cat-lies-on-the-sofa-royalty-free-image-1678488026.jpg?crop=1xw:0.84415xh;center,top',
    },
};

export const Sizes: Story = {
    render: (props) => {
        return (
            <div className="flex items-center">
                <Avatar size="extraSmall" {...props} />
                <Avatar size="small" {...props} />
                <Avatar size="base" {...props} />
                <Avatar size="large" {...props} />
                <Avatar size="extraLarge" {...props} />
            </div>
        );
    },
    args: {
        avatarURL:
            'https://hips.hearstapps.com/hmg-prod/images/beautiful-smooth-haired-red-cat-lies-on-the-sofa-royalty-free-image-1678488026.jpg?crop=1xw:0.84415xh;center,top',
    },
};
