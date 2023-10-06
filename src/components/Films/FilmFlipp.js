import React from "react";
import { NavLink } from "react-router-dom";
import { history } from "../../App";
import { useDispatch } from "react-redux";
import "./css/FilmFlipp.css";
import { OPEN_MODAL_VIDEO } from "../../redux/types/ModalVideoConst";

export default function FilmFlipp(props) {
  const { phim } = props;

  const dispatch = useDispatch();

  return (
    <>
      <div className="flip-card xl:my-1 2xl:mt-0 rounded ">
        <div className="flip-card-inner ">
          <div className="flip-card-front rounded">
            <img
              className="xl:w-72 2xl:w-72 xl:h-80 2xl:h-80 rounded"
              src={phim.hinhAnh}
              alt={phim.maPhim}
              // style={{ width: 300, height: 400 }}
            />
          </div>
          <div
            className="flip-card-back rounded"
            style={{ position: "relative", backgroundColor: "rgba(0,0,0,.9)" }}
          >
            <div className="rounded" style={{ position: "absolute", top: 0 }}>
              <img
                className="xl:w-72 2xl:w-72 xl:h-80 2xl:h-80  rounded"
                src={phim.hinhAnh}
                alt={phim.maPhim}
                // style={{ width: 300, height: 400 }}
              />
            </div>
            <div
              className="w-full h-full border border-solid border-violet-600 rounded"
              style={{
                position: "absolute",
                backgroundColor: "rgba(0,0,0,.7)",
              }}
            >
              <div className="flex justify-center items-center h-5/6">
                <div>
                  <div
                    onClick={() => {
                      dispatch({
                        type: OPEN_MODAL_VIDEO,
                      });
                      localStorage.setItem(
                        "trailerParams",
                        JSON.stringify(phim)
                      );
                    }}
                    className="flex justify-center cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-20 w-20 text-violet-700  hover:text-gray-50 transition ease-in-out duration-300 hover:scale-110"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div
                    onClick={() => {
                      history.push(`/detailfilm/${phim.maPhim}`);
                    }}
                    className="cursor-pointer font-bold"
                    style={{ fontSize: "15px " }}
                  >
                    {phim.tenPhim}
                  </div>
                </div>
              </div>

              <div className="flex justify-center py-1">
                <NavLink
                  to={`/detailfilm/${phim.maPhim}`}
                  type="button"
                  className="flex items-center justify-center w-2/3 p-2 text-sm text-gray-50 font-bold tracking-wide shadow-lg rounded bg-opacity-75 dark:bg-violet-700 hover:text-gray-50 transition ease-in-out duration-300 hover:scale-110 "
                >
                  Đặt vé
                </NavLink>
              </div>
              {/* chuyển hướng trang cách 2: giữ giao diện gốc */}
              {/* <div className="flex justify-center ">
                <button
                  onClick={() => {
                    history.push(`/detailfilm/${phim.maPhim}`);
                  }}
                  type="button"
                  className="flex items-center justify-center w-28 p-3 font-semibold tracking-wide rounded-md dark:bg-violet-400 dark:text-gray-900 hover:transition hover:duration-300 hover:ease-in-out "
                >
                  Đặt vé
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
