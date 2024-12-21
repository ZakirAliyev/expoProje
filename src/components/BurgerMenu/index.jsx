import './index.scss'
import * as React from 'react';
import {Button, Drawer} from "antd";
import {FaBars, FaFacebook, FaInstagram, FaTelegram, FaTwitter, FaYoutube} from "react-icons/fa";
import logo from '/src/assets/logo1.png'
import {Link} from "react-router";
import {useGetAllCategoriesTreeQuery} from "../../services/usersApi.jsx";


export default function BurgerMenu() {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const {data: categoryData} = useGetAllCategoriesTreeQuery()
    const categories = categoryData?.data

    const DrawerList = (
        <section id={"burgerMenu"}>
            <div className={"img"}>
                <img src={logo} alt={"Logo"}/>
            </div>
            <div className={"lineWrapper"}>
                <div className={"greenLine"}></div>
            </div>
            <div className={"links"}>
                <Link to={`/about`} className={"link"}>Haqqımızda</Link>
                <Link to={`/new-products`} className={"link"}>Yeni məhsullar</Link>
                <Link to={`/discounts`} className={"link"}>Endirimlər</Link>
                <Link to={`/terms`} className={"link"}>Qaydalar</Link>
                <Link to={`/contact`} className={"link"}>Əlaqə</Link>
            </div>
            <div className={"lineWrapper"}>
                <div className={"greenLine"}></div>
            </div>
            <div className={"social"}>
                <Link to={`/`} className={"icon"}><FaInstagram/></Link>
                <Link to={`/`} className={"icon"}><FaFacebook/></Link>
                <Link to={`/`} className={"icon"}><FaTwitter/></Link>
                <Link to={`/`} className={"icon"}><FaTelegram/></Link>
                <Link to={`/`} className={"icon"}><FaYoutube/></Link>
            </div>
            {/*<div className={"links"}>*/}
            {/*    {categories && categories.slice(0, 6).map((category) => (*/}
            {/*        <Link to={`/`} className={"link"}>*/}
            {/*            {category?.name.charAt(0).toUpperCase() + category?.name.slice(1).toLowerCase()}*/}
            {/*        </Link>*/}
            {/*    ))}*/}
            {/*</div>*/}
            {/*yazikar ag */}
        </section>
    );

    return (
        <div>
            <Button className={"gizli"} onClick={toggleDrawer(true)}><FaBars className={"menuIcon"}/></Button>
            <Drawer headerStyle={{
                backgroundColor: 'black',
                color: 'white',
            }}
                    bodyStyle={{
                        backgroundColor: 'black',
                        padding: '20px',
                    }} open={open} onClose={toggleDrawer(false)} anchor={"right"}
                    sx={{
                        '& .MuiDrawer-paper': {
                            backgroundColor: '#111',
                            width: 260,
                            justifyContent: 'space-between',
                        },
                        '& .close-icon': {
                            color: '#fff'
                        },
                    }}>
                {DrawerList}
            </Drawer>
        </div>
    );
}