import { useModal } from '@/shared/hooks';
import { Card, Modal } from '@/shared/UIKit';

export function ForTestPage() {
    const { isOpen, onOpen, onClose, onToggle } = useModal(true);

    return (
        <div className={'p-4'}>
            <Card className={'mt-20 flex w-full flex-col gap-2 p-2 '}>
                <button onClick={onToggle}>otooglew</button>
                <Modal isOpen={isOpen} onClose={onClose}>
                    123
                </Modal>
            </Card>
        </div>
    );
}
