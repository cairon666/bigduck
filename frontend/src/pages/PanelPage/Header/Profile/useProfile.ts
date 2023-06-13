import { useCallback, useRef, useState } from 'react';

import { useOnClickOutside } from '../../../../hooks';
import { useAppSelector } from '../../../../services/Redux';

export function useProfile() {
    const userStorage = useAppSelector((state) => state.user);
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);

    const onClick = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    useOnClickOutside(ref, () => {
        setIsOpen(false);
    });

    return {
        isOpen,
        onClick,
        ref,
        user: userStorage.user,
        isLoading: userStorage.isLoading,
    };
}
