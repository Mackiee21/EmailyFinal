import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const authReducerApi = createApi({
    reducerPath: userInfo,
    baseQuery: fetchBaseQuery({
        baseUrl: '127.0.0.1:3000',
    }),
    endpoints(builder){
        return {
            
        }
    }
});


export { authReducerApi };