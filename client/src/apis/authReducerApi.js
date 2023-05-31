import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const authReducerApi = createApi({
    reducerPath: "user",
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://emailyapp.cyclic.app',
    }),
    endpoints(builder){
        return {
            isLogin: builder.query({
                query: () => {
                    return {
                        url: '/data',
                        method: 'GET'
                    }
                }
            }),

        }
    }
});

export const  { useIsLoginQuery } = authReducerApi;
export { authReducerApi };