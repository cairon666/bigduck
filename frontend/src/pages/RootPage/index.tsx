import { Link } from '../../components/ui';

const RootPage = () => {
    return (
        <div
            className={
                'flex flex-col w-screen h-screen justify-center items-center'
            }
        >
            <h1 className={'text-3xl mb-10'}>root page</h1>
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
