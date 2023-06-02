import { CSSProperties, RefObject, useCallback, useLayoutEffect, useState } from 'react';

import { useEventListener } from '../../../hooks';

type positionXType = 'left' | 'right' | 'center';
type positionYType = 'top' | 'bottom' | 'center';

export interface positionProps {
    X?: positionXType;
    Y?: positionYType;
}

interface usePositionProps {
    refCalendar: RefObject<HTMLDivElement>;
    refInput: RefObject<HTMLDivElement>;
    position?: positionProps;
}

export function usePosition({ refCalendar, refInput, position }: usePositionProps) {
    const [style, setStyle] = useState<CSSProperties | undefined>(undefined);

    const calculate = useCallback(() => {
        if (!refCalendar?.current || !refInput?.current) {
            return;
        }

        position = {
            X: position?.X ? position?.X : 'center',
            Y: position?.Y ? position?.Y : 'center',
        };

        setStyle(
            calculateStyle(
                position,
                refCalendar.current.getBoundingClientRect(),
                refInput.current.getBoundingClientRect(),
            ),
        );
    }, [position, refCalendar, refInput]);

    // for dynamic update
    useEventListener('resize', calculate);

    // initial set style
    useLayoutEffect(() => calculate, [calculate]);

    return { style };
}

function calculateStyle(position: positionProps, rectCalendar: DOMRect, rectInput: DOMRect): CSSProperties {
    const style: CSSProperties = {};

    switch (position.X) {
        case 'left': {
            if (rectInput.left > rectCalendar.width) {
                style.right = '100%';
            } else {
                style.left = -rectInput.left;
            }
            break;
        }
        case 'right': {
            // rectInput.right - от начала элемента
            // right - от конца элемента
            const right = rectInput.right - rectInput.width;
            if (right > rectCalendar.width) {
                style.left = '100%';
            } else {
                style.right = -right;
            }
            break;
        }
        case 'center': {
            style.left = (rectInput.width - rectCalendar.width) / 2;
            break;
        }
    }

    // vertical
    switch (position.Y) {
        case 'top': {
            style.bottom = '100%';
            break;
        }
        case 'bottom': {
            style.top = '100%';
            break;
        }
        case 'center': {
            style.top = (rectInput.height - rectCalendar.height) / 2;
            break;
        }
    }

    return style;
}
