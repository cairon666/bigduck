import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import { rootSaga } from './sagas';
import { authSlice, notifySlice, userSlice } from './slices';

const sagaMiddleware = createSagaMiddleware();
export const rootReducer = combineReducers({
    auth: authSlice.reducer,
    user: userSlice.reducer,
    notify: notifySlice.reducer,
});

const middlewares = [logger, sagaMiddleware];

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(middlewares);
    },
});

sagaMiddleware.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
