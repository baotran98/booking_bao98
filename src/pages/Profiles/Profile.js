import React, { useEffect, useState } from "react";
import { Form, Popover, Avatar, List } from "antd";
import VirtualList from "rc-virtual-list";
import { useDispatch, useSelector } from "react-redux";
import {
  layThongTinUserAction,
  updateThongTinUserAction,
} from "../../redux/actions/QuanLyUserAction";
import { useFormik } from "formik";
import moment from "moment";
import { history } from "../../App";
import { OPEN_MODAL } from "../../redux/types/ModalSeatConst";
import _ from "lodash";

const ContainerHeight = 530;

export default function Profile(props) {
  const [visibleProfile, setVisibleProfile] = useState(false);
  const [visibleButton, setVisibleButton] = useState(false);
  const [visibleTicket, setVisibleTicket] = useState(false);

  const { thongTinUser } = useSelector((state) => state.QuanLyUserReducer);

  const dispacth = useDispatch();

  useEffect(() => {
    dispacth(layThongTinUserAction());
    appendData();
  }, []);

  const formik = useFormik({
    enableReinitialize: true, // dùng để chỉnh sửa giá trị
    initialValues: {
      taiKhoan: thongTinUser.taiKhoan,
      matKhau: thongTinUser.matKhau,
      email: thongTinUser.email,
      soDt: thongTinUser.soDT,
      maNhom: thongTinUser.maNhom,
      maLoaiNguoiDung:
        thongTinUser.loaiNguoiDung === "Quản trị" ? "QuanTri" : "KhachHang",
      hoTen: thongTinUser.hoTen,
    },
    onSubmit: (values) => {
      console.log({ values });
      dispacth(updateThongTinUserAction(values));
    },
  });

  const onScroll = (e) => {
    if (
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      ContainerHeight
    ) {
      appendData();
    }
  };

  const appendData = () => {
    dispacth(layThongTinUserAction());
  };

  return (
    <div className="font-sans antialiased dark:text-gray-900 leading-normal tracking-wider">
      <div
        className="w-screen h-screen md:-mx-4 absolute"
        style={{
          // backgroundImage: "url('https://source.unsplash.com/1L71sPT5XKc')",
          backgroundImage: `url(${require("../../assets/bg-profile-moviess.jpg")})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          filter: "blur(4px)",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            height: "100vh",
          }}
        ></div>
      </div>
      <div className="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0 relative">
        {/*Main Col*/}
        <div
          id="profile"
          className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl text-gray-50 bg-gray-900 opacity-80 mx-6 lg:mx-0 animate__animated animate__fadeIn"
        >
          <div className="p-4 md:px-5 md:p-3 text-center lg:text-left">
            {/* Image for mobile view*/}
            <div
              className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"
              style={{
                backgroundImage:
                  'url("https://source.unsplash.com/random/?wallpaper")',
              }}
            />
            <div className="flex justify-end">
              <div>
                <Popover
                  content={<span className="font-bold ">Trang chủ</span>}
                  trigger="hover"
                >
                  <button
                    onClick={() => {
                      history.push("/");
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-7 w-7 text-violet-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  </button>
                </Popover>
              </div>
              {visibleButton ? (
                <Popover
                  content={<span className="font-bold">Hủy bỏ</span>}
                  trigger="hover"
                >
                  <button
                    onClick={() => {
                      setVisibleProfile(false);
                      setVisibleButton(false);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-violet-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M6.707 4.879A3 3 0 018.828 4H15a3 3 0 013 3v6a3 3 0 01-3 3H8.828a3 3 0 01-2.12-.879l-4.415-4.414a1 1 0 010-1.414l4.414-4.414zm4 2.414a1 1 0 00-1.414 1.414L10.586 10l-1.293 1.293a1 1 0 101.414 1.414L12 11.414l1.293 1.293a1 1 0 001.414-1.414L13.414 10l1.293-1.293a1 1 0 00-1.414-1.414L12 8.586l-1.293-1.293z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </Popover>
              ) : (
                <Popover
                  content={<span className="font-bold">Sửa thông tin</span>}
                  trigger="hover"
                >
                  <button
                    onClick={() => {
                      setVisibleProfile(!visibleProfile);
                      setVisibleButton(true);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-7 w-7 text-violet-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                </Popover>
              )}
            </div>
            <Form onSubmitCapture={formik.handleSubmit}>
              <div className="flex items-center">
                <h1 className="text-3xl font-bold  lg:pt-0 text-gray-50">
                  <span onChange={formik.handleChange}>
                    {thongTinUser.taiKhoan}
                  </span>
                </h1>

                <div className="text-sm text-violet-500 ml-2 mb-2">
                  <span>({thongTinUser.loaiNguoiDung})</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="mx-auto lg:mx-0 w-4/5  border-b-2 border-violet-500 opacity-25" />
              </div>

              <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 fill-current text-violet-700 pr-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span className="text-sm text-gray-600 mr-1">Họ và tên: </span>
                {visibleProfile ? (
                  <input
                    className="shadow-lg px-2 rounded transition duration-1000"
                    type="text"
                    name="hoTen"
                    onChange={formik.handleChange}
                    value={formik.values.hoTen}
                  />
                ) : (
                  <input
                    className="bg-gray-900 text-gray-50"
                    type="text"
                    value={thongTinUser.hoTen}
                    disabled
                  />
                )}
              </p>
              <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 fill-current text-violet-700 pr-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span className="text-sm text-gray-600 mr-1">Mật khẩu: </span>
                {visibleProfile ? (
                  <input
                    className="shadow-lg px-2 rounded transition duration-1000"
                    type="password"
                    name="matKhau"
                    onChange={formik.handleChange}
                    value={formik.values.matKhau}
                  />
                ) : (
                  <input
                    className="bg-gray-900 text-gray-50"
                    type="password"
                    value={thongTinUser.matKhau}
                    disabled
                  />
                )}
              </p>
              <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 fill-current text-violet-700 pr-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span className="text-sm text-gray-600 mr-1">Email: </span>
                {visibleProfile ? (
                  <input
                    className="shadow-lg px-2 rounded transition duration-1000"
                    type="email"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                ) : (
                  <input
                    className="bg-gray-900 text-gray-50"
                    type="text"
                    value={thongTinUser.email}
                    disabled
                  />
                )}
              </p>
              <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 fill-current text-violet-700 pr-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span className="text-sm text-gray-600 mr-1">
                  Số điện thoại:
                </span>
                {visibleProfile ? (
                  <input
                    className="shadow-lg px-2 rounded transition duration-1000"
                    type="text"
                    name="soDt"
                    onChange={formik.handleChange}
                    value={formik.values.soDt}
                  />
                ) : (
                  <input
                    className="bg-gray-900 text-gray-50"
                    type="text"
                    value={thongTinUser.soDT}
                    disabled
                  />
                )}
              </p>
              <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 fill-current text-violet-700 pr-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
                <span className="text-sm text-gray-600 mr-1">Mã nhóm: </span>
                {visibleProfile ? (
                  <input
                    className="shadow-lg px-2 rounded transition duration-1000"
                    type="text"
                    name="maNhom"
                    onChange={formik.handleChange}
                    value={formik.values.maNhom}
                    disabled
                  />
                ) : (
                  <input
                    className="bg-gray-900 text-gray-50"
                    type="text"
                    value={thongTinUser.maNhom}
                    disabled
                  />
                )}
              </p>
              {/* <p className="pt-8 text-sm">
              Totally optional short description about yourself, what you do and
              so on.
              </p> */}
              <div className="pt-5 pb-5">
                <button
                  type="submit"
                  className="bg-gray-900 hover:bg-violet-800 text-white font-bold py-2 px-4 mr-2 rounded-full transition duration-300"
                  onClick={() => {
                    setVisibleProfile(false);
                    setVisibleButton(false);
                  }}
                >
                  Cập nhật
                </button>
              </div>
            </Form>
            <div className="absolute xl:mb-4 xl:ml-3 xl:bottom-64 2xl:bottom-48 2xl:mb-0 2xl:ml-0 left-28 lg:pb-0 w-4/5 lg:w-full mx-auto flex flex-wrap items-center justify-between">
              <button
                onClick={() => {
                  setVisibleTicket(!visibleTicket);
                }}
                className="bg-violet-700 hover:bg-violet-800 text-white font-bold py-2 px-4 rounded-full transition duration-300"
              >
                Vé đã đặt
              </button>
            </div>
            {/* Use https://simpleicons.org/ to find the svg for your preferred product */}
          </div>
        </div>
        {/*Img Col*/}
        <div className="w-ful lg:w-2/5">
          {/* Big profile image for side bar (desktop) */}
          {visibleTicket ? (
            <div className="bg-gray-50 opacity-85 p-2 xl:w-96 shadow-lg shadow-gray-700 rounded-lg animate__animated animate__fadeInUp">
              <div className="text-2xl text-center my-1">Danh sách vé</div>
              <hr />
              <List>
                <VirtualList
                  data={_.orderBy(
                    thongTinUser.thongTinDatVe,
                    ["ngayDat"],
                    ["desc"]
                  )}
                  height={ContainerHeight}
                  itemHeight={47}
                  itemKey="maVe"
                  onScroll={onScroll}
                >
                  {(item) => (
                    <List.Item key={item.maVe}>
                      <List.Item.Meta
                        avatar={<Avatar src={item.hinhAnh} />}
                        title={
                          <div className="flex">
                            <div className="font-bold">
                              {item.tenPhim.length > 20 ? (
                                <span>{item.tenPhim.slice(0, 20)}... </span>
                              ) : (
                                <span>{item.tenPhim}</span>
                              )}
                            </div>
                            (<span>{item.thoiLuongPhim} phút</span>)
                          </div>
                        }
                        description={
                          <div className="flex">
                            <div>
                              <span className="font-bold">Giá vé:</span>{" "}
                              {item.giaVe.toLocaleString()} VNĐ
                            </div>
                            <div className="ml-1 font-bold">
                              ({moment(item.ngayDat).format("DD/MM/YYYY")})
                            </div>
                          </div>
                        }
                      />
                      <button
                        onClick={() => {
                          dispacth({
                            type: OPEN_MODAL,
                            isModalVisible: true,
                          });
                          localStorage.setItem(
                            "seatParams",
                            JSON.stringify(item)
                          );
                        }}
                        className="font-bold text-violet-500 text-sm"
                      >
                        [ Chi tiết ]
                      </button>
                    </List.Item>
                  )}
                </VirtualList>
              </List>
            </div>
          ) : (
            <img
              src="https://ih1.redbubble.net/image.1410738109.3217/flat,750x,075,f-pad,750x1000,f8f8f8.jpg"
              className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block animate__animated animate__fadeInUp"
              alt="logo"
            />
          )}
        </div>
      </div>
    </div>
  );
}
