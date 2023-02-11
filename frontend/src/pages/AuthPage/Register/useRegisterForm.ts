import { object, string } from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { registerAction } from '../../../redux/actions/auth';

type FormData = {
  login: string;
  password: string;
  username: string;
  first_name: string;
  second_name: string;
  email: string;
};

const registerScheme = object({
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
  username: string()
    .required('Никнейм обязательный параметр')
    .min(4, 'Никнейм должен содержать от 4 символов'),
  first_name: string()
    .required('Имя обязательный параметр')
    .min(4, 'Имя должно содержать от 4 символов'),
  second_name: string()
    .required('Фамилия обязательный параметр')
    .min(4, 'Фамилия должна содержать от 4 символов'),
  email: string()
    .required('Почта обязательный параметр')
    .email('Неверный формат почты'),
});

export const useRegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(registerScheme),
  });
  const { isLoading, alreadyExist } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const onSubmit = handleSubmit(async (data) => {
    await dispatch(registerAction(data));
  });

  return {
    register,
    onSubmit,
    errors,
    isLoading,
    alreadyExist,
  };
};
