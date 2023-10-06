import React, { useState, useEffect, Fragment } from "react";
import { Route, Redirect } from "react-router";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  UnorderedListOutlined,
  UserOutlined,
  VideoCameraOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import "./css/AdminTemplate.css";
import HeaderTemplate from "./Header/HeaderTemplate";
import { USER_LOGIN } from "../../util/settings/config";
import { history } from "../../App";

const { Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Người dùng", "sub1", <UserOutlined />, [
    getItem(
      <NavLink to="/admin/user">Danh sách</NavLink>,
      "1",
      <UnorderedListOutlined />
    ),
    getItem(
      <NavLink to="/admin/user/createuser">Thêm người dùng</NavLink>,
      "2",
      <FileAddOutlined />
    ),
  ]),
  getItem("Phim", "sub2", <VideoCameraOutlined />, [
    getItem(
      <NavLink to="/admin/film">Danh sách</NavLink>,
      "3",
      <UnorderedListOutlined />
    ),
    getItem(
      <NavLink to="/admin/film/createfilm">Thêm phim</NavLink>,
      "4",
      <FileAddOutlined />
    ),
  ]),
];

export const AdminTemplate = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const { userLogin } = useSelector((state) => state.QuanLyUserReducer);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  if (!localStorage.getItem(USER_LOGIN)) {
    alert("Bạn chưa đăng nhập để vào trang này!");
    return <Redirect to="/login" />;
  }

  // if (userLogin.maLoaiNguoiDung !== "QuanTri") {
  //   alert("Bạn không có quyền truy cập vào trang này!");
  //   return <Redirect to="/login" />;
  // }

  const { Component, ...restProps } = props;

  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        // propsRoute trả về các props.history, props.location, props.match...các tham số trên thanh URL
        // truyền propsRoute để truyền tham số hoặc điều hướng trang nếu ko sử dụng ko cần thêm propsRoute
        return (
          <Fragment>
            <Layout
              style={{
                minHeight: "100vh",
              }}
            >
              <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
              >
                <img
                  onClick={() => {
                    history.push("/");
                  }}
                  src="https://movie-booking-project.vercel.app/img/logoTixLoading.png"
                  alt="logo"
                  className="w-20 2xl:ml-8 my-3 cursor-pointer"
                />
                <Menu
                  theme="dark"
                  defaultSelectedKeys={["1"]}
                  mode="inline"
                  items={items}
                />
              </Sider>
              <Layout className="site-layout">
                <HeaderTemplate {...propsRoute} />
                <Content className="m-5 ">
                  <div
                    className="dark:bg-white shadow-lg rounded"
                    style={{
                      marginTop: 45,
                      padding: 24,
                      minHeight: 839,
                    }}
                  >
                    <Component {...propsRoute} />
                  </div>
                </Content>
                <Footer
                  style={{
                    textAlign: "center",
                  }}
                >
                  Ant Design ©2022 Created by Ant UED
                </Footer>
              </Layout>
            </Layout>
          </Fragment>
        );
      }}
    />
  );
};
