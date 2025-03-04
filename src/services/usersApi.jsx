import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import Cookies from "js-cookie";

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://exposite-001-site1.ntempurl.com/api/',
        prepareHeaders: (headers) => {
            const token = Cookies.get('expoToken');
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
        getAllProductByName: builder.query({
            query: (name) => ({
                url: `/Product/get-all-products-by-name/${name}`,
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
            query: ({productId, count}) => ({
                url: `/Basket/add-basket-item?productId=${productId}&count=${count}`,
                method: 'POST',
            }),
        }),
        putDecreaseBasketItemCount: builder.mutation({
            query: ({basketItemId}) => ({
                url: `/Basket/decrease-basket-item-count?basketItemId=${basketItemId}`,
                method: 'PUT',
            }),
        }),
        deleteBasketItem: builder.mutation({
            query: ({basketItemId}) => ({
                url: `/Basket/delete-basket-item?basketItemId=${basketItemId}`,
                method: 'DELETE',
            }),
        }),

        getWishlistItems: builder.query({
            query: () => ({
                url: `/Wishlist/get-wishlist`,
            }),
        }),
        postWishlistAdd: builder.mutation({
            query: ({productId}) => ({
                url: `/Wishlist/add?productId=${productId}`,
                method: 'POST',
            }),
        }),
        deleteWishlistRemove: builder.mutation({
            query: ({productId}) => ({
                url: `/Wishlist/remove?productId=${productId}`,
                method: 'DELETE',
            }),
        }),

        getUserDetails: builder.query({
            query: () => ({
                url: `/UserAccount/get-user-details`,
            }),
        }),
        postUserUpdate: builder.mutation({
            query: (user) => ({
                url: `/UserAccount/update-user`,
                method: 'POST',
                body: user,
                headers: {'Content-Type': 'application/json'}
            }),
        }),

        postAdminLogin: builder.mutation({
            query: (admin) => ({
                url: `/UserAccount/admin-login`,
                method: 'POST',
                body: admin,
                headers: {'Content-Type': 'application/json'}
            }),
        }),

        postContactSend: builder.mutation({
            query: (data) => ({
                url: `/Contact/send`,
                method: 'POST',
                body: data,
                headers: {'Content-Type': 'application/json'}
            }),
        }),

        getAllProductsByCategoryId: builder.query({
            query: (categoryId) => ({
                url: `/Product/get-all-products-by-categoryId/${categoryId}`,
            }),
        }),

        getAllUsers: builder.query({
            query: () => ({
                url: `/AdminUser/get-all-users`,
            })
        }),

        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `/Categories/delete-category/${id}`,
                method: 'DELETE',
            }),
        }),

        postCreateProduct: builder.mutation({
            query: (data) => ({
                url: `/Product/create-product`,
                method: 'POST',
                body: data,
            })
        }),

        postUpdateProduct: builder.mutation({
            query: (data) => ({
                url: `/Product/update-product`,
                method: 'PUT',
                body: data,
            })
        }),

        getAllBanners: builder.query({
            query: () => ({
                url: `/Banner/get-all-banners`,
            })
        }),
        postCreateBanner: builder.mutation({
            query: (data) => ({
                url: `/Banner/create-banner`,
                method: 'POST',
                body: data,
            })
        }),
        deleteBanner: builder.mutation({
            query: (id) => ({
                url: `/Banner/delete-banner/${id}`,
                method: 'DELETE',
                body: id,
            })
        }),

        getAllBrands: builder.query({
            query: () => ({
                url: `/Brand/get-all-brands`,
            })
        }),
        postCreateBrand: builder.mutation({
            query: (data) => ({
                url: `/Brand/create-brand`,
                method: 'POST',
                body: data,
            })
        }),
        deleteBrand: builder.mutation({
            query: (id) => ({
                url: `/Brand/delete-brand/${id}`,
                method: 'DELETE',
                body: id,
            })
        }),

        getAllRBanners: builder.query({
            query: () => ({
                url: `/RightBanner/get-all-rightbanners`,
            })
        }),
        postCreateRBanner: builder.mutation({
            query: (data) => ({
                url: `/RightBanner/create-rightbanner`,
                method: 'POST',
                body: data,
            })
        }),
        deleteRBanner: builder.mutation({
            query: (id) => ({
                url: `/RightBanner/delete-rightbanner/${id}`,
                method: 'DELETE',
                body: id,
            })
        }),

        getAllProductsByNew: builder.query({
            query: () => ({
                url: `/Product/get-all-products-by-new`,
            }),
        }),

        postConfirmBasket: builder.mutation({
            query: (data) => ({
                url: `/Basket/confirm-basket`,
                method: 'POST',
                body: data,
            })
        }),

        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/Product/delete-product/${id}`,
                method: 'DELETE',
            }),
        }),

        getAllOrders: builder.query({
            query: () => ({
                url: `/Order/get-all-orders`,
            }),
        }),
        putCancelOrder: builder.mutation({
            query: (id) => ({
                url: `/Order/cancel-order/${id}`,
                method: 'PUT',
            })
        }),
        putConfirmOrder: builder.mutation({
            query: (id) => ({
                url: `/Order/confirm-order/${id}`,
                method: 'PUT',
            })
        }),
        deleteOrder: builder.mutation({
            query: (id) => ({
                url: `/Order/delete-order/${id}`,
                method: 'DELETE',
            })
        }),

        getAllOrdersByUser: builder.query({
            query: () => ({
                url: `/Order/get-orders-by-user`,
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
    useGetAllProductByNameQuery,

    usePostForgotPasswordMutation,
    usePostResetPasswordMutation,

    useGetBasketItemsQuery,
    usePostAddBasketItemMutation,
    usePutDecreaseBasketItemCountMutation,
    useDeleteBasketItemMutation,

    useGetWishlistItemsQuery,
    usePostWishlistAddMutation,
    useDeleteWishlistRemoveMutation,

    useGetUserDetailsQuery,
    usePostUserUpdateMutation,

    usePostAdminLoginMutation,

    usePostContactSendMutation,

    useGetAllProductsByCategoryIdQuery,

    useGetAllUsersQuery,

    useDeleteCategoryMutation,

    usePostCreateProductMutation,
    usePostUpdateProductMutation,

    useGetAllBannersQuery,
    usePostCreateBannerMutation,
    useDeleteBannerMutation,

    useGetAllBrandsQuery,
    usePostCreateBrandMutation,
    useDeleteBrandMutation,

    useGetAllRBannersQuery,
    usePostCreateRBannerMutation,
    useDeleteRBannerMutation,

    useGetAllProductsByNewQuery,

    usePostConfirmBasketMutation,

    useDeleteProductMutation,

    useGetAllOrdersQuery,
    usePutCancelOrderMutation,
    usePutConfirmOrderMutation,
    useDeleteOrderMutation,
    useGetAllOrdersByUserQuery
} = usersApi