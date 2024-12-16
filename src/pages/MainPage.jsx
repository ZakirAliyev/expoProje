import React from 'react';
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/index.jsx";
import BottomNavbar from "../components/BottomNavbar/index.jsx";
import Footer from "../components/Footer/index.jsx";

function MainPage() {
    const location = useLocation();
    const hideAdminPanelLayout = location.pathname.startsWith('/cp');

    return (
        <>
            {!hideAdminPanelLayout && <Navbar />}
            {!hideAdminPanelLayout && <BottomNavbar />}
            <Outlet />
            {!hideAdminPanelLayout && <Footer />}
        </>
    );
}

export default MainPage;
