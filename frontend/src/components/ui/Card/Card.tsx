import classNames from 'classnames';
import { HTMLProps } from 'react';

export const Card = (props: HTMLProps<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={classNames(
        props.className,
        'p-1 border border-blue-600 rounded-md',
      )}
    />
  );
};
