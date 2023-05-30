import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const authReducerApi = createApi({
    reducerPath: '',
    baseQuery: fetchBaseQuery({
        baseUrl: '127.0.0.1:3000' || 'https://emailyapp.cyclic.app',
    }),
    endpoints(builder){
        return {
            
        }
    }
});


export { authReducerApi };