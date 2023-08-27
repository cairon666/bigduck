import { createContext } from 'react';

interface AccordionContextType {
    value: Record<string, boolean>;
    onChange: (value?: string) => void;
}

export const AccordionContext = createContext<AccordionContextType>({
    value: {},
    onChange: () => {},
});
