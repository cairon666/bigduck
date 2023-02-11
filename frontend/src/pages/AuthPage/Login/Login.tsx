import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { useLoginForm } from "./useLoginForm";
import Link from "../../../components/ui/Link";


export const Login = () => {
  const { register, onSubmit, errors,isLoading, alreadyExist} = useLoginForm();
  return (
    <>
      <div className={'text-2xl mb-2'}>Авторизация</div>
      <form onSubmit={onSubmit} className={'flex flex-col gap-2 w-1/2'}>
        <Input
          fullWidth
          label="Логин"
          type="text"
          error = {errors.login?.message || alreadyExist.login}
          required
          {...register('login')}
        />
        <Input
          fullWidth
          label={"Пароль"}
          type="password"
          error = {errors.password?.message}
          required
          {...register('password')}
        />
        <Button type="submit" className={""} disabled = {isLoading}>
          Войти
        </Button>
      </form>
      <div className="text-md mt-2">
        Нет аккаунта? <Link to ={'/auth/register'}>Зарегистрироваться</Link>
      </div>
    </>
  );
};
