import { useCallback, useRef, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../_redux';
import { useOnClickOutside } from '../../../../hooks';

export function useProfile() {
    const userStorage = useAppSelector((state) => state.user);
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);
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

    // useEffect(() => {
    //     dispatch(fetchUser());
    // }, []);

    return {
        isOpen,
        onOpen,
        ref,
        user: userStorage.user,
        isLoading: userStorage.isLoading,
    };
}
