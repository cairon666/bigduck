import { Outlet } from 'react-router-dom';
import Card from '../../components/ui/Card';

export const AuthPage = () => {
  return (
    <div
      className={'flex w-screen h-screen flex-col justify-center items-center'}
    >
      <Card className={'w-1/3 flex flex-col items-center p-4'}>
        <Outlet />
      </Card>
    </div>
  );
};
