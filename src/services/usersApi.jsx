import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import Cookies from "js-cookie";

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://exposite-001-site1.ntempurl.com/api/',
        prepareHeaders: (headers) => {
            const token = Cookies.get('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
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
        }),
        getAllProducts: builder.query({
            query: () => ({
                url: `/Product/get-all-products`,
            }),
        }),

        getAllCategoriesTree: builder.query({
            query: () => ({
                url: `/Categories/getAllCategoriesTree`,
            }),
        }),
        postNewCategory: builder.mutation({
            query: (categoryData) => ({
                url: `/Categories/create-category`,
                method: 'POST',
                body: categoryData,
            }),
        }),
        putCategory: builder.mutation({
            query: (categoryData) => ({
                url: `/Categories/update-category`,
                method: 'PUT',
                body: categoryData,
            }),
        }),

        getProductById: builder.query({
            query: (id) => ({
                url: `/Product/get-product-by-id/${id}`,
            }),
        }),

        postForgotPassword: builder.mutation({
            query: (email) => ({
                url: `/UserAccount/forgot-password`,
                method: 'POST',
                body: email,
            }),
        }),
        postResetPassword: builder.mutation({
            query: (data) => ({
                url: `/UserAccount/reset-password`,
                method: 'POST',
                body: data,
            }),
        }),

        getBasketItems: builder.query({
            query: () => ({
                url: `/Basket/get-basket-items`,
            }),
        }),
        postAddBasketItem: builder.mutation({
            query: ({ productId, count }) => ({
                url: `/Basket/add-basket-item?productId=${productId}&count=${count}`,
                method: 'POST',
            }),
        }),
    }),
})
export const {
    usePostUserRegisterMutation,
    usePostUserLoginMutation,
    usePostTestFileUploadMutation,
    useGetAllProductsQuery,

    useGetAllCategoriesTreeQuery,
    usePostNewCategoryMutation,
    usePutCategoryMutation,

    useGetProductByIdQuery,

    usePostForgotPasswordMutation,
    usePostResetPasswordMutation,

    useGetBasketItemsQuery,
    usePostAddBasketItemMutation,
} = usersApi