import { Outlet } from "react-router-dom";

export function RecoverPasswordLayout() {
    return (
        <div>
            <p>Востановление пароля</p>
            <Outlet />
        </div>
    );
}
