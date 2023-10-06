import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { history } from "../../../../App";
import { Select, Dropdown, Menu, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import _ from "lodash";
import { TOKEN, USER_LOGIN } from "../../../../util/settings/config";

const { Option } = Select;

export default function Header(props) {
  const { t, i18n } = useTranslation();
  const { userLogin } = useSelector((state) => state.QuanLyUserReducer);

  const menu = (
    <Menu
      items={[
        // userLogin.maLoaiNguoiDung === "QuanTri"
        {
          key: "1",
          label: (
            <div
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                history.push("/admin/film");
              }}
            >
              Quản trị
            </div>
          ),
        },
        // : "",
        {
          key: "2",
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
          key: "3",
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

  const handleChange = (value) => {
    i18n.changeLanguage(value);
  };
  const renderSignInUP = () => {
    if (_.isEmpty(userLogin)) {
      return (
        <Fragment>
          <button
            onClick={() => {
              history.push("/login");
            }}
            className="self-center px-6 py-3 font-semibold mr-1 rounded-md hover:shadow-md hover:shadow-gray-900 transition ease-in duration-300 hover:text-violet-700 hover:bg-violet-50 hover:scale-95"
          >
            {t("Đăng nhập")}
          </button>
          <button
            onClick={() => {
              history.push("/register");
            }}
            className="self-center px-8 py-3 font-semibold rounded-md shadow-md shadow-gray-900 dark:bg-violet-700 dark:text-gray-50 transition ease-in duration-100  hover:text-gray-50 hover:scale-95"
          >
            {t("Đăng ký")}
          </button>
        </Fragment>
      );
    }
    return (
      <>
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
      </>
    );
  };
  return (
    <>
      <header className="p-2 dark:bg-gray-800 dark:text-gray-100 opacity-90 fixed w-full z-10 shadow-md ">
        <div className="container flex justify-between h-16 mx-auto">
          <div
            rel="noopener noreferrer"
            aria-label="Back to homepage"
            className="flex items-center p-2"
          >
            <img
              src="https://movie-booking-project.vercel.app/img/logoTixLoading.png"
              alt="logo"
              className="w-20 ml-16"
            />
          </div>
          <ul className="items-stretch hidden space-x-3 lg:flex">
            <li className="flex ml-36">
              <NavLink
                to="/home"
                rel="noopener noreferrer"
                className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent transition duration-500 text-white hover:dark:text-violet-700"
                activeClassName="dark:text-violet-700 dark:border-violet-700"
              >
                {t("Trang chủ")}
              </NavLink>
            </li>
            <li className="flex">
              <NavLink
                to="/contact"
                rel="noopener noreferrer"
                className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent transition duration-500 text-white hover:dark:text-violet-700"
                activeClassName="dark:text-violet-700 dark:border-violet-700"
              >
                {t("Liên hệ")}
              </NavLink>
            </li>
            <li className="flex">
              <NavLink
                to="/news"
                rel="noopener noreferrer"
                className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent transition duration-500 text-white hover:dark:text-violet-700"
                activeClassName="dark:text-violet-700 dark:border-violet-700"
              >
                {t("Tin tức")}
              </NavLink>
            </li>
          </ul>
          <div className="items-center  flex-shrink-0 hidden lg:flex ">
            {renderSignInUP()}
          </div>
          <div className="items-end py-5 ">
            <Select
              defaultValue="vi"
              style={{ width: 120 }}
              onChange={handleChange}
            >
              <Option value="vi">
                <img img={require("../../../../assets/vietnam.png")} />
                tiếng Việt
              </Option>
              <Option value="en">
                <img img={require("../../../../assets/vietnam.png")} />
                tiếng Anh
              </Option>
              <Option value="chi">
                <img img={require("../../../../assets/vietnam.png")} />
                tiếng Trung
              </Option>
            </Select>
          </div>

          <button className="p-4 lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 dark:text-gray-100"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </header>
    </>
  );
}
