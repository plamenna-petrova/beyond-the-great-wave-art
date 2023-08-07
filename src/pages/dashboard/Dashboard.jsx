
import { useEffect, useState } from "react";

import { MenuFoldOutlined, MenuUnfoldOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';

import { Layout, Menu, Button, theme } from 'antd';
import { useLocation, useNavigate, Route, Routes, Outlet } from "react-router-dom";
import GalleriesManagement from "./galleries-management/GalleriesManagement";
import ArtFieldsManagement from "./art-fields-management/ArtFieldsManagement";
import ArtMovementsManagement from "./art-movements-management/ArtMovementsManagement";

const { Header, Sider, Content } = Layout;

export default function Dashboard() {
    const navigate = useNavigate();
    const location = useLocation();

    const [selectedKeys, setSelectedKeys] = useState("/dashboard");
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    useEffect(() => {
        const pathName = location.pathname;
        setSelectedKeys(pathName);
    }, [location.pathname]);

    const { token: { colorBgContainer } } = theme.useToken();

    return (
        <Layout style={{ marginTop: 120 + 'px' }}>
            <Sider 
                trigger={null} 
                collapsible 
                collapsed={isSidebarCollapsed}
            >
                <div className="demo-logo-vertical"></div>
                <Menu
                    theme="dark"
                    mode="inline"
                    onClick={(menuItem) => {
                        navigate(menuItem.key)
                    }}
                    items={[
                        {
                            key: '/dashboard/art-fields-management',
                            icon: <VideoCameraOutlined />,
                            label: 'Art Fields Management'
                        },
                        {
                            key: '/dashboard/art-movements-management',
                            icon: <UploadOutlined />,
                            label: 'Art Movements Management'
                        },
                        {
                            key: '/dashboard/artists-management',
                            icon: <VideoCameraOutlined />,
                            label: 'Artists'
                        },
                        {
                            key: '/dashboard/galleries-management',
                            icon: <UploadOutlined />,
                            label: 'Galleries'
                        }
                    ]}
                />
            </Sider>
            <Layout>
                <Header
                    style={{ padding: 0, background: colorBgContainer, textAlign: 'left' }}
                >
                    <Button
                        type="text"
                        icon={isSidebarCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                        style={{ 
                            fontSize: '16px', 
                            width: 64, 
                            height: 64
                        }}
                    ></Button>
                </Header>
                <Content style={{ 
                    margin: '24px 16px', 
                    padding: 24, 
                    minHeight: 280, 
                    background: colorBgContainer }}
                >
                    <div>Content</div>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}