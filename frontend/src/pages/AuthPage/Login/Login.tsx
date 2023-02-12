import { Input, Link } from '../../../components/ui';
import { Button } from '../../../components/ui';
import { useLoginForm } from './useLoginForm';

export const Login = () => {
    const { register, onSubmit, errors, isLoading, queryErrors } =
        useLoginForm();

    return (
        <>
            <div className={'text-2xl mb-2'}>Авторизация</div>
            <form
                onSubmit={onSubmit}
                className={'flex flex-col gap-2 w-2/3 sm:w-full'}
            >
                <Input
                    fullWidth
                    label='Логин'
                    type='text'
                    id='login'
                    error={errors.login?.message || queryErrors.notFound}
                    required
                    {...register('login')}
                />
                <Input
                    fullWidth
                    label={'Пароль'}
                    type='password'
                    id='password'
                    error={errors.password?.message || queryErrors.badPassword}
                    required
                    {...register('password')}
                />
                <Button type='submit' className={''} disabled={isLoading}>
                    Войти
                </Button>
            </form>
            <div className='text-md mt-2 text-center'>
                Нет аккаунта?{' '}
                <Link to={'/auth/register'}>Зарегистрироваться</Link>
            </div>
        </>
    );
};
