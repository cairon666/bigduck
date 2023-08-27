import { useModal } from '@/shared/hooks';
//👇 This default export determines where your story goes in the story list
import { Button, Card, Modal } from '@/shared/UIKit';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Modal> = {
    title: 'Modal',
    component: Modal,
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const WithSomeContent: Story = {
    args: {
        isOpen: true,
        onClose: () => {},
        children: (
            <Card className={'p-4'}>
                <p className={'w-full text-center'}>Some content</p>
            </Card>
        ),
    },
};

export const Dynamic: Story = {
    render: (props) => {
        const { isOpen, onToggle } = useModal();

        return (
            <>
                <Button onClick={onToggle}>Open</Button>
                <Modal {...props} isOpen={isOpen} onClose={onToggle} />
            </>
        );
    },
    args: {
        children: (
            <Card className={'p-4'}>
                <p className={'w-full text-center'}>Some content</p>
            </Card>
        ),
    },
};
