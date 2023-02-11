import classNames from 'classnames';
import { forwardRef, HTMLProps } from 'react';

type InputProps = HTMLProps<HTMLInputElement> & {
  fullWidth?: boolean;
  label?: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { fullWidth, label, error, required, ...otherProps } = props;

  return (
    <label className='block'>
      {label && (
        <span
          className={classNames(
            'block text-sm font-medium text-slate-700',
            error ? '!text-red-600' : '',
          )}
        >
          {label} {required && <span className={'text-red-700'}>*</span>}
        </span>
      )}
      <input
        {...otherProps}
        ref={ref}
        className={classNames(
          props.className,
          `rounded border-2 border-slate-300 hover:border-indigo-300
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200
      disabled:shadow-none focus-visible:border-indigo-600 
      focus-visible:outline-none py-1 px-2`,
          fullWidth ? 'w-full' : '',
          error ? '!border-red-600 ' : '',
        )}
      />
      {error && (
        <span className={'block text-xs font-medium text-red-600'}>
          {error}
        </span>
      )}
    </label>
  );
});
