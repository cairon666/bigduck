import { createContext } from 'react';

interface SwitchContextType {
    active?: string;
    onChange: (value?: string) => void;
}

const initStateContext: SwitchContextType = {
    active: undefined,
    onChange: () => {},
};

export const SwitchContext = createContext<SwitchContextType>(initStateContext);
