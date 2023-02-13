import classNames from 'classnames';
import { Link as LinkRouter, LinkProps as LinkRouterProps } from 'react-router-dom';

type LinkProps = LinkRouterProps;

export const Link = (props: LinkProps) => {
    return <LinkRouter {...props} className={classNames(props.className, 'text-blue-600 hover:underline')} />;
};
