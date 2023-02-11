import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { useRegisterForm } from './useRegisterForm';
import Link from '../../../components/ui/Link';

export const Register = () => {
  const { register, onSubmit, errors, isLoading, alreadyExist } =
    useRegisterForm();

  return (
    <>
      <div className={'text-2xl mb-2'}>Регистрация</div>
      <form onSubmit={onSubmit} className={'flex flex-col gap-2 w-1/2'}>
        <Input
          fullWidth
          label={'Логин'}
          type='text'
          error={errors.login?.message || alreadyExist.login}
          required
          {...register('login')}
        />
        <Input
          fullWidth
          label={'Пароль'}
          type='password'
          error={errors.password?.message}
          required
          {...register('password')}
        />
        <Input
          fullWidth
          label={'Никнейм'}
          type='text'
          error={errors.username?.message || alreadyExist.username}
          required
          {...register('username')}
        />
        <Input
          fullWidth
          label={'Имя'}
          type='text'
          error={errors.first_name?.message}
          required
          {...register('first_name')}
        />
        <Input
          fullWidth
          label={'Фамилия'}
          type='text'
          error={errors.second_name?.message}
          required
          {...register('second_name')}
        />
        <Input
          fullWidth
          label={'Почта'}
          type='email'
          error={errors.email?.message || alreadyExist.email}
          required
          {...register('email')}
        />
        <Button type='submit' className={''} disabled={isLoading}>
          Создать
        </Button>
      </form>
      <div className={'text-md mt-2'}>
        Уже есть аккаунт? <Link to={'/auth/login'}>Войти</Link>
      </div>
    </>
  );
};
