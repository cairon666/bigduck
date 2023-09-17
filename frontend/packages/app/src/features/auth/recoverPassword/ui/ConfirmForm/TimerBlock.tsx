import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useRecoverSend } from '../../api';
import { currentState } from '../../model';

interface TimerBlockProps {
    initCount?: number;
}

export const TimerBlock = observer(({ initCount = 60 }: TimerBlockProps) => {
    const { mutate: postRecoverSend, isLoading } = useRecoverSend({ skipSetState: true });
    const [count, setCount] = useState(initCount);

    useEffect(() => {
        if (count > 0) {
            setTimeout(() => {
                setCount(count - 1);
            }, 1000);
        }
    }, [count]);

    const onClick = () => {
        postRecoverSend(currentState.email);
        setCount(initCount);
    };

    return (
        <button
            type="button"
            onClick={onClick}
            className=" text-xs text-gray-800 underline disabled:opacity-50"
            disabled={isLoading || count > 0}
        >
            Не получили код? Отправить еще раз {count > 0 ? `(${count})` : ''}
        </button>
    );
});

TimerBlock.displayName = 'TimerBlock';
