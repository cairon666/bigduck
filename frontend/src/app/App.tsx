import "./styles/index.scss";

import { AppRouter } from "@/app/providers/routerProvider/ui/AppRouter";
import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";

import { StoreProvider } from "./providers/storeProvider";

export const App = () => {
    return (
        <StrictMode>
            <BrowserRouter>
                <StoreProvider>
                    <AppRouter />
                </StoreProvider>
            </BrowserRouter>
        </StrictMode>
    );
};
