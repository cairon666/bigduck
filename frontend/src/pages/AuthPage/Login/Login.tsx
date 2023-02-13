import { Button, Input, Link } from '../../../components/ui';
import { useLoginForm } from './useLoginForm';

export const Login = () => {
    const { register, onSubmit, errors, isLoading, queryErrors } = useLoginForm();

    return (
        <>
            <div className={'mb-2 text-2xl'}>Авторизация</div>
            <form onSubmit={onSubmit} className={'flex w-2/3 flex-col gap-2 sm:w-full'}>
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
                Нет аккаунта? <Link to={'/auth/register'}>Зарегистрироваться</Link>
            </div>
        </>
    );
};
