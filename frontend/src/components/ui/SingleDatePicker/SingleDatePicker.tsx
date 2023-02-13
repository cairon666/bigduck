import 'react-datepicker/dist/react-datepicker.css';

import * as React from 'react';
import DatePicker from 'react-datepicker';

import { Wrapper } from '../Wrapper';

export interface SingleDatePickerProps {
    selected?: Date | null;
    onChange: (date: Date | null, event: React.SyntheticEvent<unknown> | undefined) => void;
    placeholder?: string;
    label?: string;
    error?: string;
    required?: boolean;
}

export const SingleDatePicker = (props: SingleDatePickerProps) => {
    return (
        <Wrapper error={props.error} label={props.label} required={props.required}>
            <DatePicker
                onChange={props.onChange}
                selected={props.selected}
                placeholderText={props.placeholder}
                popperClassName='bottom-start'
                className='relative w-full cursor-pointer cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm'
            />
        </Wrapper>
    );
};
