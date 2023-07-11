import classNames from "classnames";

import styles from "./Avatar.module.scss";

export interface AvatarProps {
    firstName?: string;
    secondName?: string;
    avatarURL?: string;
    size?: "extraSmall" | "small" | "base" | "large" | "extraLarge";
}

export function Avatar({ size = "base", ...props }: AvatarProps) {
    const wrapperClassName = classNames(styles.wrap, {
        [styles.extraSmall]: size === "extraSmall",
        [styles.small]: size === "small",
        [styles.base]: size === "base",
        [styles.large]: size === "large",
        [styles.extraLarge]: size === "extraLarge",
    });

    return (
        <div className={wrapperClassName}>
            <AvatarContent {...props} />
        </div>
    );
}

function AvatarContent({ firstName, secondName, avatarURL }: Omit<AvatarProps, "size">) {
    if (avatarURL) {
        return <img className={"h-full w-full object-cover"} src={avatarURL} alt="avatar" />;
    }

    if (firstName && firstName.length > 0 && secondName && secondName.length > 0) {
        return <TextAvatar text={firstName[0] + secondName[0]} />;
    }

    if (firstName && firstName.length > 1) {
        return <TextAvatar text={firstName.slice(0, 2)} />;
    }

    return (
        <svg
            className="absolute -left-1 -bottom-2 h-12 w-12 animate-pulse text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
        </svg>
    );
}

function TextAvatar({ text }: { text: string }) {
    return <span className="font-medium text-gray-600">{text.toUpperCase()}</span>;
}
