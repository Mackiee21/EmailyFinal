import { configureStore } from '@reduxjs/toolkit';
import { authReducerApi  } from './apis/authReducerApi';

const store = configureStore({
    reducer: authReducerApi.reducer,
})

export { store };