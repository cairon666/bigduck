import { memo } from "react";

export interface UserAvatarProps {
    first_name?: string;
    second_name?: string;
}

export const UserAvatar = memo(function UserAvatar({ first_name, second_name }: UserAvatarProps) {
    const firstLetter = !first_name || first_name.length == 0 ? "" : first_name[0].toUpperCase();
    const secondLetter = !second_name || second_name.length == 0 ? "" : second_name[0].toUpperCase();

    return (
        <p className={"flex h-[40px] w-[40px] items-center justify-center rounded bg-gray-80 text-sm text-gray-900"}>
            {firstLetter + secondLetter}
        </p>
    );
});
