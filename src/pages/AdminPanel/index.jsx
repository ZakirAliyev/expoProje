import './index.scss';
import React, {useState} from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import {Button, Layout, Menu, theme} from 'antd';
import logo from '/src/assets/logo1.png';
import {TbCategory} from "react-icons/tb";
import CategoriesPanel from "../../components/CategoriesPanel/index.jsx";
import UsersPanel from "../../components/UsersPanel/index.jsx";

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
            default:
                return <></>;
        }
    };

    return (
        <section id={"adminPanel"}>
            <Layout className={"layout"}>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div className="demo-logo-vertical"/>
                    <img src={logo} alt={"Logo"} className={"logo"}/>
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        onClick={({key}) => setSelectedKey(key)}
                        items={[
                            {
                                key: '1',
                                icon: <TbCategory/>,
                                label: 'İstifadəçilər',
                            },
                            {
                                key: '2',
                                icon: <TbCategory/>,
                                label: 'Kateqoriyalar',
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
                    </Header>
                    <Content
                        style={{
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
