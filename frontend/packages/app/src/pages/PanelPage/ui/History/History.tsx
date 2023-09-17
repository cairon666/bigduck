import classNames from 'classnames';
import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface HistoryItems {
    generic: RegExp;
    to: string;
    title: string;
}

interface ListItem {
    to: string;
    title: string;
}

const items: HistoryItems[] = [
    {
        generic: /\/panel*/,
        to: '/panel',
        title: 'Главная',
    },
    {
        generic: /\/panel\/settings*/,
        to: '/panel/settings/',
        title: 'Настройки',
    },
    {
        generic: /\/panel\/settings\/security/,
        to: '/panel/settings/security',
        title: 'Безопастность и вход',
    },
    {
        generic: /\/panel\/settings\/personal/,
        to: '/panel/settings/personal',
        title: 'Личные данные',
    },
    {
        generic: /\/panel\/support*/,
        to: '/panel/support',
        title: 'Поддержка',
    },
];

export function History() {
    const location = useLocation();

    const list = useMemo(() => {
        const arr: ListItem[] = [];

        items.forEach((item) => {
            const match = item.generic.test(location.pathname);
            if (match) {
                arr.push({
                    to: item.to,
                    title: item.title,
                });
            }
        });

        return arr;
    }, [location]);

    return (
        <div className="ml-4 flex items-center gap-4">
            {list.map((item, index) => {
                return (
                    <Link
                        key={index}
                        to={item.to}
                        className={classNames(
                            'text-lg font-medium',
                            index === list.length - 1 ? 'text-bold text-black' : 'text-gray-400',
                        )}
                    >
                        <span className="mr-4">/</span> {item.title}
                    </Link>
                );
            })}
        </div>
    );
}
