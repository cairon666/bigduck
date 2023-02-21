import { useCallback, useRef, useState } from 'react';

import { useOnClickOutside } from '../../../../_hooks';
import { useAppSelector } from '../../../../_redux';

export function useProfile() {
    const userStorage = useAppSelector((state) => state.user);
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);

    const onOpen = useCallback(() => {
        setIsOpen(true);
    }, []);

    const onClose = useCallback(() => {
        setIsOpen(false);
    }, []);

    useOnClickOutside(ref, () => {
        onClose();
    });

    const initials = userStorage.user
        ? userStorage.user.first_name[0].toUpperCase() + userStorage.user.second_name[0].toUpperCase()
        : 'AП';

    const email = userStorage.user?.email ? simpleString(userStorage.user.email, 21) : 'some@bigduck.ru';
    const fullName = userStorage.user
        ? `${simpleString(userStorage.user.first_name, 10)} ${simpleString(userStorage.user.second_name, 10)}`
        : 'Анонимный Пользователь';

    return {
        isOpen,
        onOpen,
        initials,
        ref,
        email,
        fullName,
    };
}

function simpleString(s: string, max_n: number): string {
    if (s.length > max_n && s.length > 3) {
        return s.slice(0, max_n) + '...';
    }
    return s;
}
