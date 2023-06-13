import classNames from 'classnames';

export interface LoaderProps {
    size?: 'small' | 'medium' | 'large';
}

const smallClassName = 'text-2xl';
const mediumClassName = 'text-4xl';
const largeClassName = 'text-6xl';

export function Loader({ size = 'medium' }: LoaderProps) {
    const style = size === 'small' ? smallClassName : size === 'large' ? largeClassName : mediumClassName;

    return (
        <div className={'flex h-full w-full flex-col items-center justify-center'}>
            <h2 className={classNames('text-gray-600', style)}>Загрузка...</h2>
            <p className={'text-xl text-gray-600'}>пожалуйста подождите</p>
        </div>
    );
}
