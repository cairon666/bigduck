import { useCallback, useState } from "react";

export function useModal(initValue = false) {
    const [isOpen, setIsOpen] = useState(initValue);

    const onOpen = useCallback(() => {
        setIsOpen(true);
    }, []);

    const onClose = useCallback(() => {
        setIsOpen(false);
    }, []);

    const onToggle = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    return { isOpen, onOpen, onClose, onToggle, setIsOpen };
}
