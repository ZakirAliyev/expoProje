import React from 'react';
import {Outlet} from "react-router-dom";
import Navbar from "../components/Navbar/index.jsx";
import BottomNavbar from "../components/BottomNavbar/index.jsx";
import Footer from "../components/Footer/index.jsx";

function MainPage() {
    return (
        <>
            <Navbar/>
            <BottomNavbar/>
            <Outlet/>
            <Footer/>
        </>
    );
}

export default MainPage;