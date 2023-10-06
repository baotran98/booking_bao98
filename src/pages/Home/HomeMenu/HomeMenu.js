import React, { Fragment, useState } from "react";
import { Radio, Space, Tabs } from "antd";
import moment from "moment";
import { NavLink } from "react-router-dom";
import { history } from "../../../App";
import { AnimationOnScroll } from "react-animation-on-scroll";
const { TabPane } = Tabs;

export default function HomeMenu(props) {
  const { heThongCumRap } = props;

  const [tabPosition, setTabPosition] = useState("left");

  const renderHeThongRap = () => {
    return heThongCumRap.map((heThongRap) => {
      return (
        <TabPane
          key={heThongRap.maHeThongRap}
          tab={
            <img
              className="rounded-full w-16 shadow-md shadow-gray-800"
              src={heThongRap.logo}
              alt={heThongRap.tenHeThongRap}
            />
          }
          className="text-white"
        >
          <Tabs tabPosition={tabPosition}>
            {heThongRap.lstCumRap?.slice(0, 8).map((cumRap) => {
              return (
                <TabPane
                  key={cumRap.maCumRap}
                  tab={
                    <div className="flex w-96 animate__animated animate__fadeIn">
                      <img
                        src="https://movie-booking-project.vercel.app/img/cumRap/bhd-star-vincom-quang-trung-16105960645760.png"
                        alt=""
                        className="w-14 mr-2 shadow-lg rounded"
                      />
                      <div className="text-start">
                        <div className="text-violet-400">
                          {cumRap.tenCumRap}
                        </div>
                        <div className="text-white">
                          {cumRap.diaChi.length > 55 ? (
                            <span>{cumRap.diaChi.slice(0, 55)}...</span>
                          ) : (
                            <span>{cumRap.diaChi}</span>
                          )}
                        </div>
                        <button className="text-white text-sm hover:text-violet-400">
                          [Chi tiết]
                        </button>
                      </div>
                    </div>
                  }
                >
                  {cumRap.danhSachPhim?.slice(0, 4).map((phim) => {
                    return (
                      <div
                        className="animate__animated animate__fadeIn"
                        key={phim.maPhim}
                      >
                        <div className="flex m-2 ">
                          <img
                            className="w-20 shadow-lg rounded"
                            src={phim.hinhAnh}
                            alt={phim.maPhim}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                "https://source.unsplash.com/random/300x300/?1";
                            }}
                          />
                          <div>
                            <h3
                              onClick={() => {
                                history.push(`/detailfilm/${phim.maPhim}`);
                              }}
                              className="text-white text-lg mx-2 cursor-pointer"
                            >
                              {phim.tenPhim}
                            </h3>
                            <p className="ml-2 text-gray-50">(120 phút)</p>-
                            <span className="text-gray-50">
                              {phim.hot === true ? true : ""}
                            </span>
                          </div>
                        </div>
                        <div>
                          <div className="text-white text-sm font-bold mx-2">
                            Lịch chiếu
                          </div>
                          <div className="grid grid-cols-4 p-3">
                            {phim.lstLichChieuTheoPhim
                              ?.splice(0, 8)
                              .map((lich) => {
                                return (
                                  <div className="text-gray-50 font-bold my-1">
                                    <span className="mr-1 ">
                                      {moment(lich.ngayChieuGioChieu).format(
                                        "DD/MM/YYYY"
                                      )}
                                    </span>
                                    -<span className="ml-1">{lich.tenRap}</span>
                                    <br />
                                    <div
                                      onClick={() => {
                                        history.push(
                                          `/checkout/${lich.maLichChieu}`
                                        );
                                      }}
                                      className="col-span-1 text-center dark:text-gray-900 w-20 mx-1 my-1 p-1 rounded bg-white shadow-lg shadow-gray-900 transition ease-in-out duration-300 hover:text-white hover:bg-violet-700 hover:scale-110 cursor-pointer"
                                      key={lich.maLichChieu}
                                    >
                                      {moment(lich.ngayChieuGioChieu).format(
                                        "hh:mm A"
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                        <hr />
                      </div>
                    );
                  })}
                </TabPane>
              );
            })}
          </Tabs>
        </TabPane>
      );
    });
  };

  return (
    <AnimationOnScroll animateIn="animate__fadeIn">
      <div className="2xl:p-20">
        <Tabs tabPosition={tabPosition}>{renderHeThongRap()}</Tabs>
      </div>
    </AnimationOnScroll>
  );
}
