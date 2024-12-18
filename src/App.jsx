import './App.css'
import {createBrowserRouter} from "react-router";
import {ROUTES} from "./routes/ROUTES.jsx";
import {RouterProvider} from "react-router-dom";
import Cookies from 'js-cookie'

function App() {

    const routes = createBrowserRouter(ROUTES);

    const token = Cookies.get("token");

    if (!token) {
        Cookies.set("token", "null");
    }

    return (
        <RouterProvider router={routes}/>
    )
}

export default App
