import { GiPlasticDuck } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { History } from 'src/pages/PanelPage/ui/History';
import { Profile } from 'src/pages/PanelPage/ui/Profile';
import { Notify } from '@pages/PanelPage/ui/Notify';

export function Header() {
    return (
        <header className="relative flex w-full items-center justify-between border-b-2 border-gray-80 bg-white px-4">
            <div className="flex items-center">
                <Link to="/panel" className="mr-4 flex items-center gap-2">
                    <GiPlasticDuck className="h-10 w-10 text-yellow-600" />
                    <div className="text-2xl font-medium">BigDuck</div>
                </Link>
                <DivideLine />
                <History />
            </div>
            <div className="flex h-full items-center">
                <Notify />
                <DivideLine />
                <Profile />
            </div>
        </header>
    );
}

function DivideLine() {
    return <div className="h-9 w-0.5 rounded bg-gray-40" />;
}
