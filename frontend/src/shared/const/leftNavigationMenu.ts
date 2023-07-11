import { IconType } from "react-icons";
import { AiOutlineHome } from "react-icons/all";

interface NavigationItem {
    icon: IconType;
    title: string;
    to: string;
}

export const navigationMenuList: NavigationItem[] = [
    {
        icon: AiOutlineHome,
        title: "Главная",
        to: "/panel",
    },
];
