import { ChangeEvent, useCallback, useState, useTransition } from 'react';
import { BiSearch } from 'react-icons/bi';
import { Input, InputProps } from '@shared/uikit';
import { SelectItems, SelectItemsProps } from '@shared/uikit/Select/SelectItems/SelectItems';

export interface FindSelectItemsOwnProps {
    findInputProps?: InputProps;
}

export type FindSelectItemsProps = Omit<SelectItemsProps, keyof FindSelectItemsOwnProps> & FindSelectItemsOwnProps;

export function FindSelectItems({ items: itemsProps, findInputProps, ...props }: FindSelectItemsProps) {
    const [items, setItems] = useState(itemsProps);
    const [_, startTransition] = useTransition();

    const onChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            // copy value
            const filter = e.target.value;

            startTransition(() => {
                const filterItems = itemsProps.filter((item) => item.label.includes(filter));
                setItems(filterItems);
            });
        },
        [itemsProps],
    );
    return (
        <>
            <Input {...findInputProps} onChange={onChange} rightIcon={<BiSearch className="h-4 w-4 text-gray-400" />} />
            <SelectItems className="mt-2 border-t-2 border-t-gray-40" items={items} {...props} />
        </>
    );
}
