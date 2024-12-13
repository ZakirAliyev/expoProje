import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://exposite-001-site1.ntempurl.com/api/',
        // prepareHeaders: (headers) => {
        //     const token = Cookies.get('token');
        //     if (token) {
        //         headers.set('Authorization', `Bearer ${token}`);
        //     }
        //     return headers;
        // },
    }),
    endpoints: (builder) => ({
        postUserRegister: builder.mutation({
            query: (newUser) => ({
                url: `/UserAccount/register`,
                method: 'POST',
                body: newUser,
                headers: {'Content-Type': 'application/json'}
            }),
        }),
        postUserLogin: builder.mutation({
            query: (user) => ({
                url: `/UserAccount/login`,
                method: 'POST',
                body: user,
                headers: {'Content-Type': 'application/json'}
            }),
        }),
        postTestFileUpload: builder.mutation({
            query: (testFile) => ({
                url: `/TestFile/upload-multiple`,
                method: 'POST',
                body: testFile,
            }),
        })
    }),
})
export const {
    usePostUserRegisterMutation,
    usePostUserLoginMutation,
    usePostTestFileUploadMutation
} = usersApi