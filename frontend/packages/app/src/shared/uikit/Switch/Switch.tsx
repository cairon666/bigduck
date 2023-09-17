import classNames from 'classnames';
import { ReactNode, useCallback, useState } from 'react';
import { SwitchContext } from '@shared/uikit/Switch/SwitchContext';

export type SwitchProps = {
    children?: ReactNode;
    onChange?: (value?: string) => void;
    className?: string;
};

export function Switch({ children, onChange: onChangeProps, className }: SwitchProps) {
    const [active, setActive] = useState<string | undefined>(undefined);

    const onChange = useCallback(
        (value?: string) => {
            setActive(value);
            onChangeProps?.(value);
        },
        [onChangeProps],
    );

    return (
        <SwitchContext.Provider
            value={{
                active,
                onChange,
            }}
        >
            <div className={classNames(className, 'flex items-center gap-2')}>{children}</div>
        </SwitchContext.Provider>
    );
}
