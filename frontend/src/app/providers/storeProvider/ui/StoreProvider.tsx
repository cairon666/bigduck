import { createReduxStore } from "@/app/providers/storeProvider";
import { ReactNode } from "react";
import { Provider } from "react-redux";

interface StoreProviderProps {
    children?: ReactNode;
}

export function StoreProvider({ children }: StoreProviderProps) {
    const store = createReduxStore();

    return <Provider store={store}>{children}</Provider>;
}
