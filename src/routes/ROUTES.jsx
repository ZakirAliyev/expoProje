import MainPage from "../pages/MainPage.jsx";
import RegisterPage from "../pages/RegisterPage/index.jsx";
import LoginPage from "../pages/LoginPage/index.jsx";
import About from "../pages/About/index.jsx";
import Home from "../pages/Home/index.jsx";
import ContactUs from "../pages/ContactUs/index.jsx";
import Terms from "../pages/Terms/index.jsx";
import NewProducts from "../pages/NewProducts/index.jsx";
import Discounts from "../pages/Discounts/index.jsx";
import ProductDetails from "../pages/ProductDetails/index.jsx";
import Basket from "../pages/Basket/index.jsx";
import Wishlist from "../pages/Wishlist/index.jsx";
import TestFileUpload from "../pages/TestFileUpload/index.jsx";
import AdminPanel from "../pages/AdminPanel/index.jsx";
import ForgotPassword from "../pages/ForgotPassword/index.jsx";
import RenewPassword from "../pages/RenewPassword/index.jsx";
import Search from "../pages/Search/index.jsx";
import AdminForm from "../pages/AdminForm/index.jsx";
import FilterAndSort from "../pages/FilterAndSort/index.jsx";
import ProfilePage from "../pages/ProfilePage/index.jsx";

export const ROUTES = [
    {
        path: '/',
        element: <MainPage/>,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: '/register',
                element: <RegisterPage/>
            },
            {
                path: '/login',
                element: <LoginPage/>
            },
            {
                path: '/profile',
                element: <ProfilePage/>
            },
            {
                path: '/about',
                element: <About/>
            },
            {
                path: '/contact',
                element: <ContactUs/>
            },
            {
                path: '/terms',
                element: <Terms/>
            },
            {
                path: '/new-products',
                element: <NewProducts/>
            },
            {
                path: '/discounts',
                element: <Discounts/>
            },
            {
                path: '/basket',
                element: <Basket/>
            },
            {
                path: '/wishlist',
                element: <Wishlist/>
            },
            {
                path: '/file',
                element: <TestFileUpload/>
            },
            {
                path: `/products/:id`,
                element: <ProductDetails/>
            },
            {
                path: `/forgot-password`,
                element: <ForgotPassword/>
            },
            {
                path: `/renew-password`,
                element: <RenewPassword/>
            },
            {
                path: `/search`,
                element: <Search/>
            },
            {
                path: `/category`,
                element: <FilterAndSort/>
            }
        ]
    },
    {
        path: '/cp',
        element: <AdminForm/>,
    },
    {
        path: '/cp/dashboard',
        element: <AdminPanel/>,
    }
];