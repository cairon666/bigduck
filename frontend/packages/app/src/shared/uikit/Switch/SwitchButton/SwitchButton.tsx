import { MouseEvent, useCallback, useContext, useEffect } from 'react';
import { Button, ButtonProps } from '@shared/uikit';
import { SwitchContext } from '@shared/uikit/Switch/SwitchContext';

export interface SwitchButtonOwnProps {
    value?: string;
    themeFunc?: (isActive: boolean) => keyof ButtonProps['theme'];
    isInit?: boolean;
}

export type SwitchButtonProps = Omit<ButtonProps, keyof SwitchButtonOwnProps> & SwitchButtonOwnProps;

const defaultThemeFunc = (isActive: boolean) => (isActive ? 'contained' : 'text');

export function SwitchButton({
    value,
    theme: themeProps,
    themeFunc,
    onClick: onClickProps,
    isInit,
    ...props
}: SwitchButtonProps) {
    const { active, onChange } = useContext(SwitchContext);

    const onClick = useCallback(
        (e: MouseEvent<HTMLButtonElement>) => {
            onChange(value);
            onClickProps?.(e);
        },
        [value, onClickProps, onChange],
    );

    // for init value
    useEffect(() => {
        if (active) return;

        if (isInit) onChange(value);
    }, []);

    // if active === undefined isActive is false
    const isActive = active !== undefined ? active === value : false;

    // if themeProps is set return themeProps
    // else if themeFunc is set call themeFunc
    // else defaultThemeFunc
    const theme = themeProps || (themeFunc ? themeFunc(isActive) : defaultThemeFunc(isActive));

    return <Button type="button" size="small" theme={theme} onClick={onClick} {...props} />;
}
