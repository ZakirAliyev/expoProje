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
import Bestsellers from "../pages/Bestsellers/index.jsx";
import Basket from "../components/Basket/index.jsx";
import Wishlist from "../pages/Wishlist/index.jsx";
import TestFileUpload from "../pages/TestFileUpload/index.jsx";
import AdminPanel from "../pages/AdminPanel/index.jsx";

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
                path: '/bestsellers',
                element: <Bestsellers/>
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
                path: `/cp`,
                element: <AdminPanel/>
            }
        ]
    },
    {
        path: '/cp',
        element: <AdminPanel/>,
    }
];