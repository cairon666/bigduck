import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

export interface ChangeArrowsProps {
    onNext: () => void;
    onPrev: () => void;
}

export function ChangeArrows({ onNext, onPrev }: ChangeArrowsProps) {
    return (
        <div className={"flex items-center gap-2"}>
            <RiArrowLeftSLine onClick={onPrev} className={"h-5 w-5 cursor-pointer rounded-full text-gray-900"} />
            <RiArrowRightSLine onClick={onNext} className={"h-5 w-5 cursor-pointer rounded-full text-gray-900"} />
        </div>
    );
}
