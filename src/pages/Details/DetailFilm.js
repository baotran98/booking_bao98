import React, { Fragment, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CustomCard } from "@tsamantanis/react-glassmorphism";
import { Tabs, Rate } from "antd";
import { getThongTinChiTietPhim } from "../../redux/actions/QuanLyRapAction";
import "@tsamantanis/react-glassmorphism/dist/index.css";
import "./css/circle.css";
import cssDetailFilm from "./css/detailFilm.module.css";
import moment from "moment";
import { history } from "../../App";
import { AnimationOnScroll } from "react-animation-on-scroll";

const { TabPane } = Tabs;

export default function DetailFilm(props) {
  // giao diện trang chi tiết với phong cách glassmorphism
  const { detailFilm } = useSelector((state) => state.QuanLyPhimReducer);
  console.log({ detailFilm });
  // dispatch
  const dispatch = useDispatch();
  // lấy dữ liệu API đưa lên Reducer
  useEffect(() => {
    let { id } = props.match.params;
    dispatch(getThongTinChiTietPhim(id));
  }, []);
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${detailFilm.hinhAnh})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          position: "relative",
          height: "95vh",
        }}
      >
        <CustomCard
          className="min-h-screen"
          effectColor="#111827" // required
          color="#111827" // default color is white
          blur={15} // default blur value is 10px
          borderRadius={-1} // default border radius value is 10px
        >
          <div className="md:flex md:justify-between mt-56 md:px-14 xl:px-60 2xl:px-96">
            <div className="md:flex items-center">
              <img
                className="w-40 mr-3 shadow-xl rounded"
                src={detailFilm.hinhAnh}
                alt={detailFilm.maPhim}
              />
              <div className="md:w-52 xl:w-72 2xl:w-72 ">
                <div className="text-sm text-white">
                  <span className="font-bold">Công chiếu: </span>
                  {moment(detailFilm.ngayKhoiChieu).format("DD.MM.YYYY")}
                </div>
                <div className="text-xl text-white font-bold">
                  {detailFilm.tenPhim}
                </div>
                <div className="text-sm text-white">
                  {detailFilm.moTa?.length > 240 ? (
                    <span>{detailFilm.moTa.slice(0, 240)}...</span>
                  ) : (
                    <span>{detailFilm.moTa}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-5">
              <div className="text-white text-center text-lg mb-3">
                Đánh giá
              </div>
              <div className={`c100 p${detailFilm.danhGia * 10} default green`}>
                <span>{detailFilm.danhGia * 10}%</span>
                <div className="slice">
                  <div className="bar"></div>
                  <div className="fill"></div>
                </div>
              </div>
              <div>
                <Rate allowHalf value={detailFilm.danhGia / 2} />;
              </div>
              <div className="text-white text-sm text-center">
                10 người đánh giá
              </div>
            </div>
          </div>
        </CustomCard>
      </div>
      <div className="flex justify-center dark:bg-gray-900 py-20">
        <div
          className=" dark:bg-gray-800  md:w-5/6 xl:w-5/6 2xl:w-2/3 p-3 rounded shadow-lg "
          style={{ minHeight: "400px" }}
        >
          <AnimationOnScroll animateIn="animate__fadeIn">
            <Tabs
              className={`${cssDetailFilm} animate__animated animate__fadeIn`}
              defaultActiveKey="1"
              centered
            >
              <TabPane
                className="text-white animate__animated animate__fadeIn"
                tab={
                  <div className="text-white hover:text-blue-500">
                    Lịch chiếu
                  </div>
                }
                key="1"
              >
                <Tabs tabPosition={"left"}>
                  {detailFilm.heThongRapChieu?.map((item) => {
                    return (
                      <TabPane
                        className="text-white animate__animated animate__fadeIn"
                        tab={
                          <div className="flex items-center">
                            <img
                              className="w-10"
                              src={item.logo}
                              alt={item.maHeThongRap}
                            />
                            <div className="text-white ml-2">
                              {item.tenHeThongRap}
                            </div>
                          </div>
                        }
                        key={item.maHeThongRap}
                      >
                        {item.cumRapChieu?.map((rapChieu) => {
                          return (
                            <Fragment>
                              <div
                                className="flex my-2 items-center"
                                key={rapChieu.maCumRap}
                              >
                                <img
                                  src={rapChieu.hinhAnh}
                                  alt={rapChieu.tenCumRap}
                                  className="w-16"
                                />
                                <div className="pl-2 ">
                                  <div className="text-lg">
                                    {rapChieu.tenCumRap}
                                  </div>
                                  <div className="">{rapChieu.diaChi}</div>
                                </div>
                              </div>
                              <div className="grid grid-cols-4 p-5">
                                {rapChieu.lichChieuPhim
                                  ?.slice(0, 12)
                                  .map((lich, index) => {
                                    return (
                                      <div className="font-bold my-1">
                                        <span className="mr-1">
                                          {moment(
                                            lich.ngayChieuGioChieu
                                          ).format("DD/MM/YYYY")}
                                        </span>
                                        -
                                        <span className="ml-1">
                                          {lich.tenRap}
                                        </span>
                                        <br />
                                        <div
                                          onClick={() => {
                                            history.push(
                                              `/checkout/${lich.maLichChieu}`
                                            );
                                          }}
                                          className="col-span-1 text-center dark:text-gray-900 w-20 mx-1 my-1 p-1 rounded bg-white shadow-lg shadow-gray-900 transition ease-in-out duration-300 hover:text-white hover:bg-violet-700 hover:scale-110 cursor-pointer"
                                          key={index}
                                        >
                                          {moment(
                                            lich.ngayChieuGioChieu
                                          ).format("hh:mm A")}
                                        </div>
                                      </div>
                                    );
                                  })}
                              </div>
                              <hr />
                            </Fragment>
                          );
                        })}
                      </TabPane>
                    );
                  })}
                </Tabs>
              </TabPane>
              <TabPane
                className="text-white animate__animated animate__fadeIn"
                tab={
                  <div className="text-white hover:text-blue-500 ">
                    Thông tin
                  </div>
                }
                key="2"
              >
                Thông tin
              </TabPane>
              <TabPane
                className="text-white animate__animated animate__fadeIn"
                tab={
                  <div className="text-white hover:text-blue-500 ">
                    Đánh giá
                  </div>
                }
                key="3"
              >
                Đánh giá
              </TabPane>
            </Tabs>
          </AnimationOnScroll>
        </div>
      </div>
    </>
  );
}
