import { configureStore } from '@reduxjs/toolkit';
import { authReducerApi  } from './apis/authReducerApi';
import { setupListeners } from '@reduxjs/toolkit/query/react';

const store = configureStore({
    reducer: {
        [authReducerApi.reducerPath]: authReducerApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
        .concat(authReducerApi.middleware);
    }
})
setupListeners(store.dispatch);
export { store };
export * from './apis/authReducerApi';