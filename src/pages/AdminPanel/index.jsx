import './index.scss';
import React, {useState} from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import {Button, Layout, Menu, theme} from 'antd';
import logo from '/src/assets/logo1.png';
import {TbBrandApple, TbCategory} from "react-icons/tb";
import CategoriesPanel from "../../components/CategoriesPanel/index.jsx";
import UsersPanel from "../../components/UsersPanel/index.jsx";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import ProductPanel from "../../components/ProductPanel/index.jsx";
import {FaUsers} from "react-icons/fa";
import {MdConstruction} from "react-icons/md";
import BannerPanel from "../../components/BannerPanel/index.jsx";
import BrandPanel from "../../components/BrandPanel/index.jsx";
import RightBannerPanel from "../../components/RightBannerPanel/index.jsx";
import {PiFlagBannerFold} from "react-icons/pi";
import {CiAlignRight} from "react-icons/ci";

const {Header, Sider, Content} = Layout;

const AdminPanel = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [selectedKey, setSelectedKey] = useState('1');

    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();

    const renderContent = () => {
        switch (selectedKey) {
            case '1':
                return <UsersPanel/>;
            case '2':
                return <CategoriesPanel/>;
            case '3':
                return <ProductPanel/>;
            case '4':
                return <BannerPanel/>;
            case '5':
                return <BrandPanel/>;
            case '6':
                return <RightBannerPanel/>;
            default:
                return <></>;
        }
    };

    const navigate = useNavigate();

    return (
        <section id={"adminPanel"}>
            <Layout className={"layout"}>
                <Sider style={{
                    backgroundColor: '#333'
                }} trigger={null} collapsible collapsed={collapsed}>
                    <div className="demo-logo-vertical"/>
                    <img src={logo} alt={"Logo"} className={"logo"}/>
                    <Menu style={{
                        backgroundColor: '#333',
                    }}
                          theme="dark"
                          mode="inline"
                          defaultSelectedKeys={['1']}
                          onClick={({key}) => setSelectedKey(key)}
                          items={[
                              {
                                  key: '1',
                                  icon: <FaUsers/>,
                                  label: 'İstifadəçilər',
                              },
                              {
                                  key: '2',
                                  icon: <TbCategory/>,
                                  label: 'Kateqoriyalar',
                              },
                              {
                                  key: '3',
                                  icon: <MdConstruction/>,
                                  label: 'Məhsullar',
                              },
                              {
                                  key: '4',
                                  icon: <PiFlagBannerFold/>,
                                  label: 'Banner-lər',
                              },
                              {
                                  key: '5',
                                  icon: <TbBrandApple/>,
                                  label: 'Brand-lar',
                              },
                              {
                                  key: '6',
                                  icon: <CiAlignRight/>,
                                  label: 'Sağ Banner-lər',
                              },
                          ]}
                    />
                </Sider>
                <Layout>
                    <Header
                        style={{
                            padding: 0,
                            background: colorBgContainer,
                        }}
                    >
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />
                        <div style={{
                            width: '100%',
                            textAlign: 'right',
                            marginTop: '-63px',
                            marginLeft: '-40px',
                            color: '#454545',
                            fontWeight: '700',
                            fontSize: '18px',
                        }}>Admin Panel <button style={{
                            backgroundColor: '#0DA5B5',
                            border: '1px solid #0DA5B5',
                            height: '40px',
                            padding: '0 24px',
                            color: 'white',
                            borderRadius: '10px',
                            fontSize: '18px',
                            marginLeft: '20px',
                        }} onClick={() => {
                            Cookies.set("expoToken", "null");
                            navigate('/');
                        }}>Çıxış</button></div>
                    </Header>
                    <Content
                        style={{
                            overflow: 'auto',
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        {renderContent()}
                    </Content>
                </Layout>
            </Layout>
        </section>
    );
};

export default AdminPanel;
