import { useCallback, useState } from 'react';

export function useModal(initState = false) {
    const [isOpen, setIsOpen] = useState(initState);

    const onOpen: () => void = useCallback(() => {
        setIsOpen(true);
    }, []);

    const onClose: () => void = useCallback(() => {
        setIsOpen(false);
    }, []);

    return { isOpen, onOpen, onClose, setIsOpen };
}
