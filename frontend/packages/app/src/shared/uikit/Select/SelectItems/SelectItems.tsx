import classNames from 'classnames';
import React, { useCallback, useContext } from 'react';
import { SelectItemValue } from '../Select';
import { SelectContext } from '../SelectContext';
import { SelectItem } from '../SelectItem/SelectItem';

export interface SelectItemsProps {
    items: SelectItemValue[];
    className?: string;
}

export function SelectItems({ items, className }: SelectItemsProps) {
    const { value, change } = useContext(SelectContext);

    const onClick = useCallback((value: SelectItemValue | undefined) => () => change(value), [change]);

    return (
        <div className={classNames('scrollbar max-h-[200px] overflow-y-auto', className)}>
            <div className="flex w-full flex-col px-2 ">
                {items.map((item) => (
                    <SelectItem
                        isActive={value?.value === item.value}
                        onClick={onClick(item)}
                        key={item.value}
                        label={item.label}
                    />
                ))}
            </div>
        </div>
    );
}
