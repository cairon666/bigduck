import { GiPlasticDuck } from 'react-icons/gi';
import { Link } from 'react-router-dom';

import { Menu } from './Menu';
import { Notify } from './Notify';
import { Profile } from './Profile';

export function Header() {
    return (
        <header className={'flex w-full items-center justify-between border-b-2 border-gray-80 bg-white px-4 py-2'}>
            <div className='flex items-center gap-4'>
                <Menu />
                <DivideLine />
                <Link to={'/panel'} className={'flex items-center gap-2'}>
                    <GiPlasticDuck className={'h-10 w-10 text-yellow-500'} />
                    <div className={'text-2xl'}>BigDuck</div>
                </Link>
            </div>
            <div className={'flex items-center gap-4'}>
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
