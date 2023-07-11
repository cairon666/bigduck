import { Card, PageHeader, Switch, SwitchButton } from "@/shared/UIKit";
import { useCallback } from "react";
import { AiOutlineSetting } from "react-icons/ai";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import { SettingsMain } from "./SettingsMain";

export function Settings() {
    return (
        <Card className={"h-full"}>
            <Header />
            <Routes>
                <Route path={""} element={<SettingsMain />} />
                <Route path={"personal"} element={"personal"} />
                <Route path={"security"} element={"security"} />
                <Route path={"*"} element={<Navigate to={"/panel/settings/"} />} />
            </Routes>
        </Card>
    );
}

function Header() {
    const navigate = useNavigate();

    const onChange = useCallback((value: string) => {
        navigate(`/panel/settings/${value}`);
    }, []);

    return (
        <PageHeader
            left={<AiOutlineSetting />}
            label={"Настройки"}
            right={
                <Switch initActive={""} onChange={onChange}>
                    <SwitchButton value={""}>Главная</SwitchButton>
                    <SwitchButton value={"personal"}>Личные данные</SwitchButton>
                    <SwitchButton value={"security"}>Безопастность и вход</SwitchButton>
                </Switch>
            }
        />
    );
}
