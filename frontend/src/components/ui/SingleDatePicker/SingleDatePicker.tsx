import DatePicker from 'react-datepicker';
import * as React from 'react';
import { Wrapper } from '../Wrapper';

import 'react-datepicker/dist/react-datepicker.css';

export interface SingleDatePickerProps {
    selected?: Date | null;
    onChange: (
        date: Date | null,
        event: React.SyntheticEvent<any> | undefined,
    ) => void;
    placeholder?: string;
    label?: string;
    error?: string;
    required?: boolean;
}

export const SingleDatePicker = (props: SingleDatePickerProps) => {
    const { label, error, required, ...otherProps } = props;

    return (
        <Wrapper error={error} label={label} required={required}>
            <DatePicker
                onChange={props.onChange}
                selected={props.selected}
                placeholderText={props.placeholder}
                popperClassName='bottom-start'
                className='cursor-pointer relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm'
            />
        </Wrapper>
    );
};
