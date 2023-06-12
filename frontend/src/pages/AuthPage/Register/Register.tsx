import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import _i18n from '../../../_i18n';
import { Button, Checkbox, DatePicker, Error, Input, Label } from '../../../components/ui';
import { useRegisterForm } from './useRegisterForm';

export function Register() {
    const { register, onSubmit, errors, onChangeDate, isLoading } = useRegisterForm();

    useEffect(() => {
        document.title = _i18n.auth.Register;
    }, []);

    return (
        <>
            <h1 className={'text-center text-xl font-medium'}>{_i18n.auth.Register}</h1>
            <form onSubmit={onSubmit} className={'flex flex-col gap-2'}>
                <Input
                    fullWidth
                    errorLabel={errors?.email?.message}
                    type={'text'}
                    placeholder={_i18n.auth.Mail}
                    required
                    label={_i18n.auth.Mail}
                    {...register('email')}
                />
                <Input
                    fullWidth
                    errorLabel={errors?.password?.message}
                    type={'password'}
                    placeholder={_i18n.auth.Password}
                    required
                    label={_i18n.auth.Password}
                    {...register('password')}
                />
                <Input
                    fullWidth
                    errorLabel={errors?.first_name?.message}
                    type={'text'}
                    placeholder={_i18n.auth.Name}
                    required
                    label={_i18n.auth.Name}
                    {...register('first_name')}
                />
                <Input
                    fullWidth
                    errorLabel={errors?.second_name?.message}
                    type={'text'}
                    placeholder={_i18n.auth.SecondName}
                    required
                    label={_i18n.auth.SecondName}
                    {...register('second_name')}
                />
                <DatePicker
                    position={{
                        X: 'right',
                        Y: 'center',
                    }}
                    error={errors?.date_of_birth?.message}
                    label={_i18n.auth.DateOfBirth}
                    placeholder={_i18n.auth.DateOfBirth}
                    {...register('date_of_birth')}
                    onChange={onChangeDate}
                />
                <div className={'flex flex-col gap-1'}>
                    <Label label={_i18n.auth.Gender} />
                    <div className={'flex items-center gap-2'}>
                        <Checkbox value='male' type='radio' {...register('gender')} label={_i18n.auth.Male} />
                        <Checkbox value='female' type='radio' {...register('gender')} label={_i18n.auth.Female} />
                    </div>
                    <Error error={errors.gender?.message} />
                </div>
                <Button disabled={isLoading} isLoading={isLoading} type={'submit'}>
                    {_i18n.auth.Create}
                </Button>
            </form>
            <p className={'mt-1 text-center text-sm font-light'}>
                <span>{_i18n.auth.AlreadyHasAccount} </span>
                <Link className={'text-yellow-500 hover:underline'} to='/auth/login'>
                    {_i18n.auth.SigIn}
                </Link>
            </p>
        </>
    );
}
