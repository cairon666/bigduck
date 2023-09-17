import { AiOutlineHome } from 'react-icons/ai';
import { Card, PageHeader } from '@shared/uikit';

export function Main() {
    return (
        <Card className="h-full">
            <PageHeader left={<AiOutlineHome className="h-5 w-5" />} label="Главный экран" />
            <div>Какой-то блок информации</div>
        </Card>
    );
}
