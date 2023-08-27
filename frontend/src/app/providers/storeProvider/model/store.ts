import { StateSchema } from '@/app/providers/storeProvider';
import { NewThunkExtraArg } from '@/app/providers/storeProvider/model/ThunkContext';
import { notifyReducer } from '@/entities/Notify';
import { userReducer } from '@/entities/User';
import { authReducer } from '@/features/auth-forms/model/slice';
import { HTTPClientFactory } from '@/shared/HTTPClient';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { logger } from 'redux-logger';

export function createReduxStore() {
    const navigate = useNavigate();
    const httpClientFactory = new HTTPClientFactory(import.meta.env.VITE_BASE_URL);

    const extraArg = NewThunkExtraArg(httpClientFactory, navigate);

    const rootReducer = combineReducers<StateSchema>({
        user: userReducer,
        notify: notifyReducer,
        auth: authReducer,
    });

    const store = configureStore({
        reducer: rootReducer,
        devTools: import.meta.env.VITE_IS_DEV,
        middleware: (getDefaultMiddleware) => {
            const middlewares = getDefaultMiddleware({
                thunk: {
                    extraArgument: extraArg,
                },
            });

            if (import.meta.env.VITE_IS_DEV) {
                middlewares.push(logger);
            }

            return middlewares;
        },
    });

    return store;
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<ReturnType<typeof createReduxStore>['getState']>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
