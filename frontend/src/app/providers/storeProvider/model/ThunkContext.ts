import { StateSchema } from '@/app/providers/storeProvider';
import { HTTPClientFactory } from '@/shared/HTTPClient';
import { NavigateFunction, useNavigate } from 'react-router-dom';

export enum ThunkExtraArgKeys {
    api = 'api',
    navigate = 'navigate',
}

export interface ThunkExtraArg {
    [ThunkExtraArgKeys.api]: HTTPClientFactory;
    [ThunkExtraArgKeys.navigate]: NavigateFunction;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}

export function NewThunkExtraArg(api: HTTPClientFactory, navigate: NavigateFunction): ThunkExtraArg {
    return {
        [ThunkExtraArgKeys.api]: api,
        [ThunkExtraArgKeys.navigate]: navigate,
    };
}
