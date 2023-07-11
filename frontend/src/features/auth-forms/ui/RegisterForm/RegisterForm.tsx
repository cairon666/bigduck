import { RegisterFormScheme, postPostRegister, registerFormScheme, useRegisterViewer } from "@/features/auth-forms";
import { useAppDispatch } from "@/shared/hooks";
import { Button, Checkbox, DatePicker, DefaultDatePicker, Error, Input, Label } from "@/shared/UIKit";
import { PasswordInput } from "@/shared/UIKit/Input/PasswordInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { Dayjs } from "dayjs";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export function RegisterForm() {
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<RegisterFormScheme>({
        resolver: yupResolver(registerFormScheme),
    });
    const { isLoading, validateError } = useRegisterViewer();

    const onSubmit = useCallback(
        (data: RegisterFormScheme) => {
            dispatch(postPostRegister(data));
        },
        [dispatch],
    );

    const onChangeDate = useCallback((date: Dayjs | undefined) => {
        setValue("date_of_birth", date?.toDate());
    }, []);
    return (
        <>
            <h1 className={"text-center text-xl font-medium"}>Регистрация</h1>
            <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col gap-2"}>
                <Input
                    error={errors?.email?.message || validateError?.email}
                    type={"text"}
                    placeholder={"Почта"}
                    required
                    label={"Почта"}
                    {...register("email")}
                />
                <PasswordInput
                    error={errors?.password?.message || validateError?.password}
                    placeholder={"Пароль"}
                    required
                    label={"Пароль"}
                    {...register("password")}
                />
                <Input
                    error={errors?.first_name?.message || validateError?.first_name}
                    type={"text"}
                    placeholder={"Имя"}
                    required
                    label={"Имя"}
                    {...register("first_name")}
                />
                <Input
                    error={errors?.second_name?.message || validateError?.second_name}
                    type={"text"}
                    placeholder={"Фамилия"}
                    required
                    label={"Фамилия"}
                    {...register("second_name")}
                />
                <DatePicker
                    inputProps={{
                        placeholder: "День рождения",
                        error: errors?.date_of_birth?.message || validateError?.date_of_birth,
                        label: "День рождения",
                    }}
                    {...register("date_of_birth")}
                    onChange={onChangeDate}
                >
                    <DefaultDatePicker />
                </DatePicker>
                <div className={"flex flex-col gap-1"}>
                    <Label>Гендер</Label>
                    <div className={"flex items-center gap-2"}>
                        <Checkbox value="male" type="radio" {...register("gender")} label={"Мужчина"} />
                        <Checkbox value="female" type="radio" {...register("gender")} label={"Женщина"} />
                    </div>
                    <Error>{errors.gender?.message || validateError?.gender} </Error>
                </div>
                <Button disabled={isLoading} isLoading={isLoading} type={"submit"}>
                    Создать
                </Button>
            </form>
            <p className={"mt-1 text-center text-sm font-light"}>
                <span>Уже есть аккаунт? </span>
                <Link className={"text-yellow-500 hover:underline"} to="/auth/login">
                    Войти
                </Link>
            </p>
        </>
    );
}
