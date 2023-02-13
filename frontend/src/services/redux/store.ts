import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';

// import { rootEpic } from "./modules/root";
import { userSlice } from './slice/user';

const epicMiddleware = createEpicMiddleware();

export const rootReducer = combineReducers({
    user: userSlice.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(logger).concat(epicMiddleware);
    },
});

// epicMiddleware.run(rootEpic);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
