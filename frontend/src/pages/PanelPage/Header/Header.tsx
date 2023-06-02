import { GiPlasticDuck } from 'react-icons/gi';
import { Link } from 'react-router-dom';

import { History } from './History';
import { Notify } from './Notify';
import { Profile } from './Profile';

export function Header() {
    return (
        <header className={'flex w-full items-center justify-between border-b-2 border-gray-80 bg-white px-4'}>
            <div className='flex items-center gap-4'>
                {/*<Menu />*/}
                <Link to={'/panel'} className={'flex items-center gap-2'}>
                    <GiPlasticDuck className={'h-10 w-10 text-yellow-600'} />
                    <div className={'text-2xl font-medium'}>BigDuck</div>
                </Link>
                <DivideLine />
                <History />
            </div>
            <div className={'flex h-full items-center gap-4'}>
                <Notify />
                <DivideLine />
                <Profile />
            </div>
        </header>
    );
}

function DivideLine() {
    return <div className={'h-9 w-0.5 rounded bg-gray-40'} />;
}
