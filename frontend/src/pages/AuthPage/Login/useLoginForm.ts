import { object, string } from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { loginAction } from '../../../redux/actions/auth';






type FormData = {
    login: string;
    password: string;
    username: string;
    first_name: string;
    second_name: string;
    email: string;
  };

  const loginScheme = object({
    login: string()
      .required('Логин обязательный параметр')
      .matches(
        /^(?=.*[A-Za-z0-9]$)[A-Za-z][A-Za-z\d.-]{0,19}$/,
        'Логин не должен содержать пробелов',
      ),
    password: string()
      .required('Пароль обязательный параметр')
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        'Пароль должен содержать как минимум 1 букву нижнего регистра, 1 букву верхнего регистра, 1 специальный знак и длина должна быть больше 8',
      ),
  });

export const useLoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<FormData>({
        resolver: yupResolver(loginScheme),
      });
      const { isLoading, alreadyExist } = useAppSelector((state) => state.auth);
      const dispatch = useAppDispatch();
    
      const onSubmit = handleSubmit(async (data) => {
        await dispatch(loginAction(data));
      });
      return {
        register,
        onSubmit,
        errors,
        isLoading,
        alreadyExist,
      };
}