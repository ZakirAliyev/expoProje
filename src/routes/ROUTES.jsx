import MainPage from "../pages/MainPage.jsx";
import RegisterPage from "../pages/RegisterPage/index.jsx";
import LoginPage from "../pages/LoginPage/index.jsx";
import About from "../pages/About/index.jsx";
import Home from "../pages/Home/index.jsx";

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
            }
        ]
    }
];