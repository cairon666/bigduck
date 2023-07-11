import { createContext } from "react";

import { SelectItemValue } from "./Select";

interface SelectContextType {
    value: SelectItemValue | undefined;
    change: (value: SelectItemValue | undefined) => void;
}

export const SelectContext = createContext<SelectContextType>({
    value: undefined,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    change: () => {},
});
