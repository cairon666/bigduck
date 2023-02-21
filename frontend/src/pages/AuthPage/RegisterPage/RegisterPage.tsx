import { useCallback, useRef } from 'react';
import { UIEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Button, Checkbox, DatePicker, Input, Label } from '../../../components/ui';
import { useRegisterForm } from './useRegisterForm';

export function RegisterPage() {
    const { register, onSubmit, errors, onChangeDate, isLoading } = useRegisterForm();

    return (
        <div className={'w-1/6  min-w-[300px] rounded bg-white px-4 py-6 shadow-md'}>
            <h1 className={'text-center text-xl font-medium'}>Регистрация</h1>
            <form onSubmit={onSubmit} className={'flex flex-col gap-2'}>
                <Input
                    fullWidth
                    error={errors?.username?.message}
                    type={'text'}
                    placeholder={'Никнейм'}
                    required
                    label={'Никнейм'}
                    {...register('username')}
                />
                <Input
                    fullWidth
                    error={errors?.login?.message}
                    type={'text'}
                    placeholder={'Логин'}
                    required
                    label={'Логин'}
                    {...register('login')}
                />
                <Input
                    fullWidth
                    error={errors?.password?.message}
                    type={'password'}
                    placeholder={'Пароль'}
                    required
                    label={'Пароль'}
                    {...register('password')}
                />
                <Input
                    fullWidth
                    error={errors?.email?.message}
                    type={'text'}
                    placeholder={'Почта'}
                    required
                    label={'Почта'}
                    {...register('email')}
                />
                <Input
                    fullWidth
                    error={errors?.first_name?.message}
                    type={'text'}
                    placeholder={'Имя'}
                    required
                    label={'Имя'}
                    {...register('first_name')}
                />
                <Input
                    fullWidth
                    error={errors?.second_name?.message}
                    type={'text'}
                    placeholder={'Фамилия'}
                    required
                    label={'Фамилия'}
                    {...register('second_name')}
                />
                <DatePicker
                    error={errors?.date_of_birth?.message}
                    label={'День рождения'}
                    placeholder={'День рождения'}
                    {...register('date_of_birth')}
                    onChange={onChangeDate}
                />
                <div>
                    <Label label={'Пол'} />
                    <div className={'flex items-center gap-2'}>
                        <Checkbox value='male' type='radio' {...register('gender')} label={'Мужчина'} />
                        <Checkbox value='female' type='radio' {...register('gender')} label={'Женщина'} />
                    </div>
                </div>
                <Button isLoading={isLoading} type={'submit'}>
                    Создать
                </Button>
            </form>
            <p className={'mt-1 text-center text-sm font-light'}>
                Уже есть аккаунт?{' '}
                <Link className={'text-yellow-500 hover:underline'} to='/auth/login'>
                    Войти
                </Link>
            </p>
        </div>
    );
}
