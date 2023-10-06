import React from "react";
import { useSelector } from "react-redux";
import { Dropdown, Layout, Menu, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { TOKEN, USER_LOGIN } from "../../../util/settings/config";
import { history } from "../../../App";

const { Header } = Layout;

const menu = (
  <Menu
    items={[
      {
        key: "1",
        label: (
          <div
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              history.push("/profile");
            }}
          >
            Thông tin tài khoản
          </div>
        ),
      },
      {
        key: "2",
        label: (
          <div
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              localStorage.removeItem(USER_LOGIN);
              localStorage.removeItem(TOKEN);
              history.push("/");
              window.location.reload(); // xóa hoàn toàn thông tin user khỏi Reducer
            }}
          >
            Đăng xuất
          </div>
        ),
      },
    ]}
  />
);

export default function HeaderTemplate(props) {
  const { userLogin } = useSelector((state) => state.QuanLyUserReducer);
  return (
    <Header
      className="site-layout-background flex justify-end items-center shadow-lg"
      style={{
        padding: 0,
      }}
    >
      <Dropdown overlay={menu}>
        <div onClick={(e) => e.preventDefault()}>
          <Space>
            Xin chào,
            <span className="text-sm hover:text-violet-500 font-bold cursor-pointer">
              {" "}
              {userLogin.taiKhoan}
            </span>
            <DownOutlined />
          </Space>
        </div>
      </Dropdown>
    </Header>
  );
}
