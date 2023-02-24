import classNames from 'classnames';
import { useCallback, useState } from 'react';
import { IconType } from 'react-icons';

import { Button } from '../Button';

export interface SwitchItem<T> {
    label: string;
    value: T;
    icon?: IconType;
}

export type SwitchProps<T> = {
    items: SwitchItem<T>[];
    onChange?: (value: T) => void;
    initActive?: T;
    className?: string;
};

export function Switch<T>(props: SwitchProps<T>) {
    const [isActive, setIsActive] = useState(props.initActive);

    const onChange = useCallback(
        (value: T) => () => {
            setIsActive(value);

            if (props.onChange) {
                props.onChange(value);
            }
        },
        [props.items, props.onChange],
    );

    return (
        <div className={classNames(props.className, 'flex items-center gap-2')}>
            {props.items.map((item, index) => {
                return (
                    <Button
                        key={index}
                        theme={isActive === item.value ? 'contained' : 'text'}
                        onClick={onChange(item.value)}
                    >
                        {item.label}
                    </Button>
                );
            })}
        </div>
    );
}
