import { memo } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/all";

export const UserNavSkeleton = memo(function UserNavSkeleton() {
    return (
        <div
            className={`flex items-center justify-between gap-2 rounded-lg border 
                border-transparent bg-gray-20 p-2 hover:border-yellow-600 
                focus-visible:border-yellow-500 focus-visible:outline-none`}
        >
            <div className={"flex w-full items-center gap-1 overflow-hidden"}>
                <div className={"h-8 w-8 min-w-[2rem] animate-pulse rounded-full bg-gray-80"} />
                <div className={"flex w-full flex-col overflow-hidden text-sm font-light"}>
                    <p className={"h-3 w-full animate-pulse truncate rounded bg-gray-80"} />
                    <p className={"mt-1 h-3 w-full animate-pulse truncate rounded bg-gray-80"} />
                </div>
            </div>

            <MdOutlineKeyboardArrowRight className={"text-black min-h-5 min-w-[2rem]"} />
        </div>
    );
});
