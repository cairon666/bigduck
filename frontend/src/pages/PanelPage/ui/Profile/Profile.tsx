import { UserAvatar, UserNav } from "@/entities/User";
import { useModal, useOnClickOutside } from "@/shared/hooks";
import { Card } from "@/shared/UIKit";
import { Transition } from "@headlessui/react";
import classNames from "classnames";
import { Fragment, useRef } from "react";
import { AiOutlineSetting } from "react-icons/ai";
import { BiExit, BiSupport } from "react-icons/all";
import { RiArrowDownSLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const list = [
    {
        to: "/panel/settings",
        label: "Настройки",
        icon: AiOutlineSetting,
    },
    {
        to: "/panel/support",
        label: "Помощь",
        icon: BiSupport,
    },
    {
        to: "/panel/logout",
        label: "Выйти",
        icon: BiExit,
    },
];

export function Profile() {
    const ref = useRef<HTMLDivElement>(null);

    const { isOpen, onClose, onOpen } = useModal();

    useOnClickOutside(ref, () => onClose());

    return (
        <div ref={ref} className={classNames("relative hover:bg-gray-20", isOpen ? "bg-gray-20" : "")}>
            <button
                type={"button"}
                onClick={onOpen}
                className={"flex  cursor-pointer items-center  gap-1 border-transparent p-0 py-2 px-2"}
            >
                <UserAvatar />
                <RiArrowDownSLine className={"h-5 w-5 text-gray-900"} />
            </button>
            <Transition
                show={isOpen}
                as={Fragment}
                enter="ease-out duration-150"
                enterFrom="opacity-0 translate-y-2"
                enterTo="opacity-100 translate-y-0"
                leave="ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-2"
            >
                <Card className={"absolute -right-1 top-full z-20 flex w-72 flex-col !rounded-t-none shadow-md"}>
                    <div className={"p-4"}>
                        <UserNav />
                    </div>
                    {list.map((item) => {
                        return (
                            <Link
                                key={item.to}
                                to={item.to}
                                className={classNames(
                                    `flex cursor-pointer items-center gap-2 border border-gray-100 border-x-transparent 
                        border-b-transparent py-2 px-4 font-light duration-75 ease-linear hover:border-yellow-500 
                        hover:bg-gray-20`,
                                )}
                            >
                                <item.icon className={"h-5 w-5"} />
                                <p>{item.label}</p>
                            </Link>
                        );
                    })}
                </Card>
            </Transition>
        </div>
    );
}
