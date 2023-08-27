import { useCallback, useEffect, useState } from 'react';

interface TimerBlockProps {
    onRepeatSend: () => void;
}

const initCount = 60;

export function TimerBlock(props: TimerBlockProps) {
    const [count, setCount] = useState(initCount);

    useEffect(() => {
        if (count > 0) {
            setTimeout(() => {
                setCount(count - 1);
            }, 1000);
        }
    }, [count]);

    const onClick = useCallback(() => {
        props.onRepeatSend();
        setCount(initCount);
    }, [props.onRepeatSend]);

    return (
        <button
            type={'button'}
            onClick={onClick}
            className={' text-xs text-gray-800 underline disabled:opacity-50'}
            disabled={count > 0}
        >
            Не получили код? Отправить еще раз {count > 0 ? `(${count})` : ''}
        </button>
    );
}
