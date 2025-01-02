import {Navigate, useLocation} from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({children}) => {
    const token = Cookies.get("expoToken");
    const role = Cookies.get("expoRole");
    const location = useLocation();
    console.log(location)

    if (!token || role === "null") {
        // Eğer token yoksa veya rol null ise Home sayfasına yönlendirilir
        if (location.pathname === "/profile" || location.pathname === "/basket" || location.pathname === "/wishlist") {
            return <Navigate to="/" replace state={{from: location}}/>;
        }
        if (location.pathname.startsWith("/cp")) {
            return <Navigate to="/" replace state={{from: location}}/>;
        }
    }

    if (role === "User") {
        if (location.pathname === "/cp/dashboard") {
            return <Navigate to="/cp" replace state={{from: location}}/>;
        }
    }

    if (role === "Admin") {
        return children;
    }

    return <Navigate to="/" replace state={{from: location}}/>;
};

export {ProtectedRoute};
