import React, { useCallback, useState } from 'react';
import { useRegisterForm } from './useRegisterForm';
import {
    Button,
    Input,
    Link,
    Select,
    SingleDatePicker,
} from '../../../components/ui';

export const Register = () => {
    const {
        register,
        onSubmit,
        errors,
        isLoading,
        alreadyExist,
        itemsSelect,
        changeSelectGender,
        watch,
        changeDate,
    } = useRegisterForm();

    return (
        <>
            <div className={'text-2xl mb-2'}>Регистрация</div>
            <form
                onSubmit={onSubmit}
                className={'flex flex-col gap-2 w-2/3 sm:w-full'}
            >
                <Input
                    fullWidth
                    label='Логин'
                    type='text'
                    placeholder='vania228'
                    error={
                        errors.login?.message ||
                        (alreadyExist.login ? 'Логин уже занят' : undefined)
                    }
                    required
                    {...register('login')}
                />
                <Input
                    width={'full'}
                    label='Пароль'
                    placeholder='********'
                    type='password'
                    error={errors.password?.message}
                    required
                    {...register('password')}
                />
                <Input
                    fullWidth
                    label='Почта'
                    placeholder='example@domain.com'
                    type='email'
                    error={
                        errors.email?.message ||
                        (alreadyExist.email ? 'Почта уже занят' : undefined)
                    }
                    required
                    {...register('email')}
                />
                <Input
                    fullWidth
                    label='Никнейм'
                    type='text'
                    placeholder='Vania'
                    error={
                        errors.username?.message ||
                        (alreadyExist.username
                            ? 'Никнейм уже занят'
                            : undefined)
                    }
                    required
                    {...register('username')}
                />
                <Input
                    fullWidth
                    label='Имя'
                    type='text'
                    placeholder='Иван'
                    error={errors.first_name?.message}
                    required
                    {...register('first_name')}
                />
                <Input
                    fullWidth
                    label='Фамилия'
                    type='text'
                    placeholder='Иванов'
                    error={errors.second_name?.message}
                    required
                    {...register('second_name')}
                />
                <SingleDatePicker
                    label='Датя рождения'
                    onChange={changeDate}
                    selected={watch('day_of_birth')}
                    placeholder={'Выбрать'}
                />
                <Select
                    label={'Гендер'}
                    items={itemsSelect}
                    value={watch('gender') || undefined}
                    onChange={changeSelectGender}
                    placeholder={'Выбрать'}
                />
                <Button type='submit' disabled={isLoading}>
                    Создать
                </Button>
            </form>
            <div className={'text-md mt-2 text-center'}>
                Уже есть аккаунт? <Link to={'/auth/login'}>Войти</Link>
            </div>
        </>
    );
};
