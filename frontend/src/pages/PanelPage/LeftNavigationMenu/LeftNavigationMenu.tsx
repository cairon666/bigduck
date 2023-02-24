import classNames from 'classnames';
import { useCallback, useMemo, useState } from 'react';
import { IconType } from 'react-icons';
import { AiOutlineHome, MdFormatListBulleted, MdQuiz } from 'react-icons/all';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

import { Button, Card } from '../../../components/ui';

interface NavigationItem {
    icon: IconType;
    title: string;
    to: string;
}

const navs: NavigationItem[] = [
    {
        icon: AiOutlineHome,
        title: 'Главная',
        to: '/panel',
    },
    {
        icon: MdFormatListBulleted,
        title: 'Список',
        to: '/panel/list',
    },
    {
        icon: MdQuiz,
        title: 'Создать',
        to: '/panel/create',
    },
];

export function LeftNavigationMenu() {
    const [isShort, setIsShort] = useState(true);

    const toggleIsShort = useCallback(() => {
        setIsShort((prev) => !prev);
    }, []);

    const navsList = useMemo(() => {
        return navs.map((nav, index) => {
            return (
                <Link
                    key={index}
                    to={nav.to}
                    className={
                        'flex h-min min-h-[3rem] items-center gap-2 overflow-hidden border border-transparent border-y-gray-100 p-2 duration-75 ease-linear hover:border-yellow-600 hover:bg-gray-20 focus-visible:border-yellow-500 focus-visible:outline-none'
                    }
                >
                    <Button tabIndex={-1} theme={'gray'} className={'h-8 w-8 min-w-[2rem]'} onlyIcon>
                        <nav.icon className={'text-gray-600'} />
                    </Button>
                    {!isShort && <p className={'text w-full text-gray-800'}>{nav.title}</p>}
                </Link>
            );
        });
    }, [isShort]);

    return (
        <Card
            className={classNames(
                'flex flex-col justify-between overflow-hidden rounded-l-none border-l-0 py-3 duration-100 ease-linear',
                isShort ? 'w-14' : 'w-[200px]',
            )}
        >
            <div className={'scrollbar flex flex-col overflow-y-auto'}>{navsList}</div>
            <button className={'flex items-center gap-2 p-2'} onClick={toggleIsShort}>
                <Button tabIndex={-1} theme={'gray'} className={'h-8 w-8 min-w-[2rem]'} onlyIcon>
                    {isShort ? (
                        <RiArrowRightSLine className={'text-gray-300'} />
                    ) : (
                        <RiArrowLeftSLine className={'text-gray-300'} />
                    )}
                </Button>
                {!isShort && <p className={'text-sm font-light text-gray-600'}>Скрыть</p>}
            </button>
        </Card>
    );
}
