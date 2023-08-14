
import { useEffect, useState } from "react";

import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

import { Layout, Menu, Button, theme } from 'antd';
import { useLocation, useNavigate, Outlet } from "react-router-dom";

const { Header, Sider, Content } = Layout;

export default function Dashboard() {
    const navigate = useNavigate();
    const location = useLocation();

    const [selectedKeys, setSelectedKeys] = useState("/dashboard/art-fields-management");
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
                    defaultSelectedKeys={selectedKeys}
                    items={[
                        {
                            key: '/dashboard/fields-management',
                            label: 'Fields'
                        },
                        {
                            key: '/dashboard/genres-management',
                            label: 'Genres'
                        },
                        {
                            key: '/dashboard/art-movements-management',
                            label: 'Art Movements'
                        },
                        {
                            key: '/dashboard/artists-management',
                            label: 'Artists'
                        },
                        {
                            key: '/dashboard/galleries-management',
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
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}