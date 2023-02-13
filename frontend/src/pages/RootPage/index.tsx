import { Link } from '../../components/ui';

const RootPage = () => {
    return (
        <div className={'flex h-screen w-screen flex-col items-center justify-center'}>
            <h1 className={'mb-10 text-3xl'}>root page</h1>
            <div className={'flex flex-col'}>
                <Link className={'text-2xl'} to={'/auth/login'}>
                    to login
                </Link>
                <Link className={'text-2xl'} to={'/auth/register'}>
                    to register
                </Link>
            </div>
        </div>
    );
};

export default RootPage;
