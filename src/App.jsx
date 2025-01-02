import './App.css'
import {createBrowserRouter} from "react-router";
import {ROUTES} from "./routes/ROUTES.jsx";
import {RouterProvider} from "react-router-dom";
import Cookies from 'js-cookie'
import {HelmetProvider} from "react-helmet-async";

function App() {

    const routes = createBrowserRouter(ROUTES);

    const token = Cookies.get("expoToken");

    if (!token) {
        Cookies.set("expoToken", "null");
    }

    const role = Cookies.get("expoRole");

    if (!role) {
        Cookies.set("expoRole", "null");
    }

    return (

        <HelmetProvider>
            <RouterProvider router={routes}/>
        </HelmetProvider>
    )
}

export default App
