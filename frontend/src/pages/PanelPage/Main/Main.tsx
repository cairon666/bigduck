import { AiOutlineHome } from 'react-icons/all';

import { Card, PageHeader } from '../../../components/ui';

export function Main() {
    return (
        <Card className={'h-full'}>
            <PageHeader icon={<AiOutlineHome className={'h-5 w-5'} />} label={'Главный экран'} />
            <div>Какой-то блок информации</div>
        </Card>
    );
}
