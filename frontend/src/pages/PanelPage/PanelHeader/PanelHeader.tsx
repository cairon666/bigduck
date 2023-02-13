import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import React, { Fragment } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { GiDuck } from 'react-icons/gi';

import { Card } from '../../../components/ui';

export const PanelHeader = () => {
    return (
        <div className='flex items-center justify-between bg-sky-800 py-2 px-5'>
            <div className='flex items-center gap-2'>
                <a href='/' className='flex select-none items-center gap-1'>
                    <GiDuck className='h-10 w-10 text-white' />
                    <div className='text-md font-bold text-white '>BigDuck</div>
                </a>
            </div>
            <div className='flex items-center gap-1'>
                <PanelLogo />
            </div>
        </div>
    );
};

const panelLogoItems = [
    {
        name: 'test',
        href: 'test',
        icon: AiOutlineUser,
    },
];

function PanelLogo() {
    return (
        <div className='w-full max-w-sm px-4'>
            <Popover className='relative'>
                {({ open }) => (
                    <>
                        <Popover.Button
                            className={`
                ${open ? '' : 'text-opacity-90'}
                group inline-flex items-center rounded-md bg-orange-700 px-3 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                        >
                            <span>Solutions</span>
                            <ChevronDownIcon
                                className={`${open ? '' : 'text-opacity-70'}
                  ml-2 h-5 w-5 text-orange-300 transition duration-150 ease-in-out group-hover:text-opacity-80`}
                                aria-hidden='true'
                            />
                        </Popover.Button>
                        <Transition
                            as={Fragment}
                            enter='transition ease-out duration-200'
                            enterFrom='opacity-0 translate-y-1'
                            enterTo='opacity-100 translate-y-0'
                            leave='transition ease-in duration-150'
                            leaveFrom='opacity-100 translate-y-0'
                            leaveTo='opacity-0 translate-y-1'
                        >
                            <Popover.Panel className='absolute right-0 z-10 mt-3 max-w-sm transform   lg:max-w-3xl sm:px-0'>
                                <div className='overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5'>
                                    <Card className='relative grid gap-8 p-2 lg:grid-cols-2'>
                                        {panelLogoItems.map((item) => (
                                            <div
                                                key={item.name}
                                                className='flex w-full items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50'
                                            >
                                                <item.icon aria-hidden='true' className='h-10 w-10' />
                                                <div className='ml-4'>
                                                    <p className='text-sm font-medium text-gray-900'>{item.name}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </Card>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>
        </div>
    );
}
