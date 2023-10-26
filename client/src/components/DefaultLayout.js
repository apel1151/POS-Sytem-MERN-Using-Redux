import {
  CopyOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShoppingCartOutlined,
  UnorderedListOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
const { Header, Sider, Content } = Layout;



const DefaultLayout = (props) => {
  const navigate = useNavigate();
  // console.log(props);

  const { cartItems } = useSelector(state => state.rootReducer);
  const [collapsed, setCollapsed] = useState(false);

  // to get localStorage Data

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems])


  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className='logo'>
                <h1 className='text-center text-light font-weight-bold mt-4'>POS</h1>
            </div>
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={window.location.pathname}
            
            >
                    <Menu.Item key="/" icon={<HomeOutlined/>}>
                        <Link to="/" className='text-decoration-none'>Home</Link>
                    </Menu.Item>
                    <Menu.Item key="/bills" icon={<CopyOutlined/>}>
                        <Link to="/bills" className='text-decoration-none'>Bills</Link>
                    </Menu.Item>
                    <Menu.Item key="/items" icon={<UnorderedListOutlined/>}>
                        <Link to="/items" className='text-decoration-none'>Items</Link>
                    </Menu.Item>
                    <Menu.Item key="/customers" icon={<UserOutlined/>}>
                        <Link to="/customers" className='text-decoration-none'>Customers</Link>
                    </Menu.Item>
                    <Menu.Item key="/logout" icon={<LogoutOutlined/>}>
                        <Link to="/logout" className='text-decoration-none'>Logout</Link>
                    </Menu.Item>

            </Menu>
            
      </Sider>
      <Layout>

              <Header
                style={{
                  padding: 0,
                  background: colorBgContainer,
                  boxShadow: '0 0 8px #ccc',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <Button
                  type="text"
                  icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                  onClick={() => setCollapsed(!collapsed)}
                  style={{
                    fontSize: '16px',
                    width: 64,
                    height: 64,
                  }}
                />

                <div className='cart-item' style={{display: "flex", marginRight: "100px", fontSize: "30px"}}>
                  <p> {cartItems.length} </p>
                  <ShoppingCartOutlined 
                  style={{marginLeft: "20px"}}
                  onClick={() => navigate('/cart')}
                  />
                </div>
              </Header>

              <Content
                style={{
                    margin: '24px 16px',
                    padding: 24,
                    minHeight: 280,
                    background: colorBgContainer,
                    height: '80vh',
                    boxShadow: '0 0 8px #ccc',
                    overflow: 'auto'
                  }}
                >
                  {props.children}
              </Content>
      </Layout>
    </Layout>
  );
};
export default DefaultLayout;