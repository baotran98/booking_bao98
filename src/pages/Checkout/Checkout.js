/* eslint-disable import/no-anonymous-default-export */
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  datVeAction,
  QuanLyDatVeAction,
} from "../../redux/actions/QuanLyDatVeAction";
import { Tabs } from "antd";
import {
  CloseOutlined,
  UserOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import trapezoid from "./css/trapezoid.module.css";
import "./css/checkout.css";
import {
  CHANGE_TAB,
  DAT_VE,
  MOVE_TAB,
} from "../../redux/types/QuanLyDatVeConst";
import _ from "lodash";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
import { layThongTinUserAction } from "../../redux/actions/QuanLyUserAction";
import moment from "moment";
import { Button, Select, Menu, Dropdown, Space } from "antd";
import { HomeOutlined, DownOutlined } from "@ant-design/icons";
import { history } from "../../App";
import { TOKEN, USER_LOGIN } from "../../util/settings/config";
import { NavLink } from "react-router-dom";
import { OPEN_MODAL } from "../../redux/types/ModalSeatConst";
const { TabPane } = Tabs;
const { Option } = Select;

const OperationsSlot = {
  right: <Button>Right Extra Action</Button>,
};

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

export default function (props) {
  const { tabActive } = useSelector((state) => state.QuanLyDatVeReducer);
  const { userLogin } = useSelector((state) => state.QuanLyUserReducer);

  const dispacth = useDispatch();

  useEffect(() => {
    dispacth({
      type: CHANGE_TAB,
      number: "1",
    });
  }, []);
  const operations = (
    <Fragment>
      {!_.isEmpty(userLogin) ? (
        <div className="flex justify-center items-center">
          <Dropdown overlay={menu}>
            <div
              className=" md:mr-24 xl:mr-52 2xl:mr-64"
              onClick={(e) => e.preventDefault()}
            >
              <Space className="">
                <img
                  className="w-6"
                  src="https://joeschmoe.io/api/v1/random"
                  alt="avatar"
                />
                <span className="text-sm hover:text-violet-500 font-bold cursor-pointer">
                  {" "}
                  {userLogin.taiKhoan}
                </span>
              </Space>
            </div>
          </Dropdown>
        </div>
      ) : (
        ""
      )}
    </Fragment>
  );

  return (
    <Fragment>
      <Tabs
        tabBarExtraContent={operations}
        defaultActiveKey="1"
        activeKey={tabActive}
        onChange={(key) => {
          dispacth({
            type: CHANGE_TAB,
            number: key.toString(),
          });
        }}
      >
        <TabPane
          tab={
            <NavLink to="/" className="flex justify-center items-center ">
              <HomeOutlined className="w-10 ml-5" style={{ fontSize: 25 }} />
            </NavLink>
          }
          key="3"
        ></TabPane>
        <TabPane
          tab="01.Chọn ghế & thanh toán"
          key="1"
          className="animate__animated animate__fadeIn"
        >
          <Checkout {...props} />
        </TabPane>
        <TabPane
          tab="02.Thông tin đặt vé"
          key="2"
          className="animate__animated animate__fadeIn"
        >
          <CheckoutInfo {...props} />
        </TabPane>
      </Tabs>
    </Fragment>
  );
}

function Checkout(props) {
  // lấy dữ liệu từ Reducer về
  const { userLogin } = useSelector((state) => state.QuanLyUserReducer);
  const { chiTietPhongVe, danhSachGheDangDat, danhSachGheDatCungLuc } =
    useSelector((state) => state.QuanLyDatVeReducer);
  const { thongTinPhim, danhSachGhe } = chiTietPhongVe;

  // hàm dispatch
  const dispatch = useDispatch();
  //
  useEffect(() => {
    // gọi hàm tạo ra 1 async function
    let { id } = props.match.params;
    // dispatch function đi
    dispatch(QuanLyDatVeAction(id));
  }, []);

  // render ghế
  const renderGhe = () => {
    return danhSachGhe.map((ghe, index) => {
      // xét điều kiện cho từng loại ghế để ghi đè css
      let classGheVip = ghe.loaiGhe === "Vip" ? "gheVip" : "";
      let classDaDat = ghe.daDat === true ? "gheDaDat" : "";
      let classGheDangDat = "";
      // kiểm tra từng ghế đc render có trong mảng đang đặt ghế ko
      let indexGheDD = danhSachGheDangDat.findIndex(
        (gheDD) => gheDD.maGhe === ghe.maGhe
      );
      if (indexGheDD !== -1) {
        classDaDat = "gheDangDat";
      }
      let classUserDat = "";
      // kiểm tra ghế đó có phải chính tài khoản đó đặt hay ko
      if (userLogin.taiKhoan === ghe.taiKhoanNguoiDat) {
        classUserDat = "gheUserDat";
      }
      let classDatCungLuc = "";
      // kiểm tra ghế đó khách khác có đang đặt cùng lúc hay ko
      let indexGheDatCungLuc = danhSachGheDatCungLuc.findIndex(
        (gheDCL) => gheDCL.maGhe === ghe.maGhe
      );
      if (indexGheDatCungLuc !== -1) {
        classDatCungLuc = "gheDatCungLuc";
      }
      return (
        <Fragment key={index}>
          <button
            onClick={() => {
              dispatch({
                type: DAT_VE,
                gheDuocChon: ghe,
              });
            }}
            disabled={ghe.daDat || indexGheDatCungLuc !== -1}
            className={`ghe ${classGheVip} ${classDaDat} ${classUserDat} ${classGheDangDat} ${classDatCungLuc}`}
          >
            {ghe.daDat ? (
              classUserDat !== "" ? (
                <UserOutlined />
              ) : (
                <CloseOutlined />
              )
            ) : classDatCungLuc !== "" ? (
              <UsergroupAddOutlined />
            ) : (
              ghe.stt
            )}
          </button>
          {/* xét điều kiện mỗi hàng chỉ có 16 ghế */}
          {(index + 1) % 16 === 0 ? <br /> : ""}
        </Fragment>
      );
    });
  };
  return (
    <>
      <div className="grid grid-cols-12 min-h-screen ">
        {/* phần hiển trị danh sách ghế và màn hình */}
        <div className="md:col-span-9 2xl:col-span-9">
          <div className="flex justify-between items-center md:px-20 xl:px-32 2xl:px-36 my-5">
            <div className="flex">
              <img
                className="w-10 drop-shadow-xl"
                src="https://movie0706.cybersoft.edu.vn/hinhanh/bhd-star-cineplex.png"
                alt="logo"
              />
              <div className="ml-2">
                <div className="md:text-xs xl:text-md 2xl:text-md font-bold">
                  <span className="text-green-500">
                    {thongTinPhim.tenCumRap}
                  </span>
                </div>
                <div className="text-gray-400">
                  {thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu} -{" "}
                  {thongTinPhim.tenRap}
                </div>
              </div>
            </div>

            <div>
              <div className="md:text-xs">Thời gian giữ ghế</div>
              <div className="text-red-500 text-center text-xl">00:00</div>
            </div>
          </div>
          <div className="flex justify-center px-4">
            <div className="bg-gray-900 w-10/12 h-4 rounded"></div>
          </div>
          <div className="flex justify-center ">
            <h3 className="absolute text-sm mt-2">Màn hình</h3>
            <div className={`${trapezoid["trapezoid"]}`}></div>
          </div>

          <div className="text-center">{renderGhe()}</div>

          <div className="flex flex-row justify-center">
            <div className="xl:mx-4 2xl:mx-6 ">
              <div className="ghe"></div>
              <div>Thường</div>
            </div>
            <div className="xl:mx-4 2xl:mx-6">
              <div className={`ghe ${"gheVip"}`}></div>
              <div>VIP</div>
            </div>
            <div className="xl:mx-4 2xl:mx-6">
              <div className={`ghe ${"gheDangDat"}`}></div>
              <div>Đang chọn</div>
            </div>
            <div className="xl:mx-4 2xl:mx-6 ">
              <div
                className={`ghe ${"gheDaDat"} flex justify-center items-center`}
              >
                <CloseOutlined />
              </div>
              <div>Đã được mua</div>
            </div>
            <div className="xl:mx-4 2xl:mx-6 ">
              <div
                className={`ghe ${"gheUserDat"} flex justify-center items-center`}
              >
                <UserOutlined />
              </div>
              <div>Bạn đã mua</div>
            </div>
            <div className="xl:mx-4 2xl:mx-6 ">
              <div
                className={`ghe ${"gheDatCungLuc"} flex justify-center items-center`}
              >
                <UsergroupAddOutlined />
              </div>
              <div>Đang được đặt cùng lúc</div>
            </div>
          </div>
        </div>
        {/* phần thanh toán vé và ghế đặt */}
        <div className="md:col-span-3 2xl:col-span-3 shadow-2xl ">
          <div className="px-5  ">
            <div className="text-green-500 text-4xl text-center py-2">
              {" "}
              {danhSachGheDangDat
                .reduce((tongTien, ghe) => {
                  return (tongTien += ghe.giaVe);
                }, 0)
                .toLocaleString()}{" "}
              đ
            </div>
            <hr />
            <div className="text-sm font-bold my-2">{thongTinPhim.tenPhim}</div>
            <div className="text-sm">{thongTinPhim.tenCumRap}</div>
            <div className="text-sm my-2">
              {thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu} -{" "}
              {thongTinPhim.tenRap}
            </div>
            <hr />
            <div className="flex justify-between">
              <div className="flex flex-wrap items-center text-sm">
                <div className="text-sm text-red-500 my-3">Ghế:</div>
                {_.sortBy(danhSachGheDangDat, ["stt"]).map((gheDD) => {
                  return (
                    <div className="" key={gheDD.maGhe}>
                      <span className="text-green-500 mx-1"> {gheDD.stt}</span>
                    </div>
                  );
                })}
              </div>
              <div className="text-sm text-green-500 my-3">
                {danhSachGheDangDat
                  .reduce((tongTien, ghe) => {
                    return (tongTien += ghe.giaVe);
                  }, 0)
                  .toLocaleString()}{" "}
                đ
              </div>
            </div>
            <hr />
            <div className="my-3">
              <div className="text-xs text-gray-400 my-1">Email</div>
              <div className="text-sm my-1">{userLogin.email}</div>
            </div>
            <hr />
            <div className="my-3">
              <div className="text-xs text-gray-400 my-1">Số điện thoại</div>
              <div className="text-sm my-1">
                {userLogin.soDT?.length > 1
                  ? userLogin.soDT
                  : "chưa có số điện thoại"}
              </div>
            </div>
            <hr />
            <div className="flex justify-between items-center my-3">
              <div>
                <div className="text-xs text-gray-400 my-1">Mã giảm giá</div>
                <div className="text-sm my-1">Tạm thời không hỗ trợ...</div>
              </div>
              <div className="bg-gray-400 text-white p-1 px-2 rounded shadow-md ">
                <button className="">Áp dụng</button>
              </div>
            </div>
            <hr />
            <div className="my-3">
              <div className="text-xs text-gray-400 my-1">
                Hình thức thanh toán
              </div>
              <div className="text-sm my-1 xl:h-80 2xl:h-60 ">....</div>
            </div>
            <div className="font-bold xl:mt-10 2xl:my-1  text-center">
              <div className="flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-red-700"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Vé đã mua không thể đổi hoặc hoàn tiền
              </div>
              <div>
                Mã vé sẽ được gửi qua tin nhắn{" "}
                <span className="text-orange-500">ZMS</span> (tin nhắn Zalo) và{" "}
                <span className="text-orange-500">Email.</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              const thongTinDatVe = new ThongTinDatVe();
              thongTinDatVe.maLichChieu = props.match.params.id;
              thongTinDatVe.danhSachVe = danhSachGheDangDat;
              console.log(thongTinDatVe);
              dispatch(datVeAction(thongTinDatVe));
            }}
            className="flex justify-center items-center w-full h-14 mb-0 text-gray-50 bg-gray-500 px-0 text-2xl font-bold "
          >
            <span className="transition duration-300 hover:scale-125">
              Đặt Vé
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
// trang thông tin người dùng
function CheckoutInfo(props) {
  const { thongTinUser } = useSelector((state) => state.QuanLyUserReducer);
  console.log({ thongTinUser });

  const dispacth = useDispatch();

  useEffect(() => {
    dispacth(layThongTinUserAction());
  }, []);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Thông tin đặt vé
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Danh sách các vé mà bạn đã mua
          </p>
        </div>
        <div className="flex flex-wrap -m-2">
          {_.orderBy(thongTinUser?.thongTinDatVe, ["ngayDat"], ["desc"]).map(
            (info) => {
              return (
                <div
                  className="p-2 lg:w-1/3 md:w-1/2 w-full animate__animated animate__fadeInUp"
                  key={info.maVe}
                >
                  <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg shadow-lg">
                    <img
                      className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                      alt={info.maVe}
                      src={info.hinhAnh}
                    />
                    <div className="flex-grow font-bold">
                      <div className="flex ">
                        <h2 className="text-gray-900 font-bold text-xs">
                          {info.tenPhim.length > 30 ? (
                            <span>{info.tenPhim.slice(0, 30)}...</span>
                          ) : (
                            <span>{info.tenPhim}</span>
                          )}
                        </h2>
                        <div className="text-violet-500 ml-1">
                          ( {info.thoiLuongPhim} phút )
                        </div>
                      </div>
                      <div className="text-gray-500">
                        Ngày đặt:{" "}
                        {moment(info.ngayDat).format("hh:mm A - DD.MM.YYYY")}
                      </div>
                      <div className="flex">
                        <div className="text-gray-500">
                          Giá vé: {info.giaVe.toLocaleString()} vnđ
                        </div>
                        <button
                          onClick={() => {
                            dispacth({
                              type: OPEN_MODAL,
                              isModalVisible: true,
                            });
                            localStorage.setItem(
                              "seatParams",
                              JSON.stringify(info)
                            );
                          }}
                          className="text-sm font-bold text-violet-500 ml-1 transition duration-300 hover:text-violet-700"
                        >
                          [ Chi tiết ]
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
}
