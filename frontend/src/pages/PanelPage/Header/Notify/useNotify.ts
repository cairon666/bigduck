import { useCallback, useEffect, useRef, useState } from 'react';

import { fetchNotifies, readAllNotifies, useAppDispatch, useAppSelector } from '../../../../_redux';
import { useOnClickOutside } from '../../../../hooks';

export function useNotify() {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);
    const notifyStorage = useAppSelector((state) => state.notify);
    const dispatch = useAppDispatch();

    const onOpen = useCallback(() => {
        setIsOpen(true);
    }, []);

    const onClose = useCallback(() => {
        setIsOpen(false);
    }, []);

    useOnClickOutside(ref, () => {
        onClose();
    });

    useEffect(() => {
        dispatch(fetchNotifies());
    }, []);

    const onReadAll = useCallback(() => {
        dispatch(readAllNotifies());
    }, []);

    return {
        isOpen,
        ref,
        onOpen,
        hasUnViewed: notifyStorage.has_unviewed,
        isLoading: notifyStorage.isLoading,
        notifies: notifyStorage.notifies,
        onReadAll: onReadAll,
    };
}
