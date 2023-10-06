import React from "react";
import Slider from "react-slick";
import FilmFlipp from "../Films/FilmFlipp";
import styleSlick from "./MultipleRowSlick.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_FILM_DANG_CHIEU,
  SET_FILM_SAP_CHIEU,
} from "../../redux/types/QuanLyPhimConst";
import { AnimationOnScroll } from "react-animation-on-scroll";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick["slick-prev"]} xl:mr-16 2xl:mr-32`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick["slick-prev"]} xl:ml-6 2xl:ml-24`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}
const MultipleRowSlick = (props) => {
  // state thay đổi trạng thái phim
  const { dangChieu, sapChieu } = useSelector(
    (state) => state.QuanLyPhimReducer
  );
  // hàm dispatch
  const dispatch = useDispatch();
  // render danh sách phim
  const renderFilm = () => {
    return props.arrFilm.slice(0, 12).map((item) => {
      return (
        <div key={item.maPhim}>
          <FilmFlipp phim={item} />
        </div>
      );
    });
  };

  const settings = {
    className: "center variable-width",
    centerMode: true,
    infinite: true,
    centerPadding: "1px",
    slidesToShow: 2,
    speed: 500,
    rows: 2,
    slidesPerRow: 2,
    variableWidth: true,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  let atvClassDangChieu =
    dangChieu === true ? "activeStatusFilm" : "none_activeStatusFilm";
  let atvClassSapChieu =
    sapChieu === true ? "activeStatusFilm" : "none_activeStatusFilm";

  return (
    <AnimationOnScroll animateIn="animate__fadeIn">
      <div className="xl:px-16 2xl:px-20 mx-auto">
        <div className="flex items-center xl:mx-16 2xl:mx-32 p-3 dark:bg-gray-900 dark:text-gray-100 hover:cursor-pointer">
          <span
            rel="noopener noreferrer"
            className={`px-5 py-1 border-b-2 dark:border-gray-700 transition duration-300 ${styleSlick[atvClassDangChieu]} `}
            onClick={() => {
              dispatch({ type: SET_FILM_DANG_CHIEU });
            }}
          >
            Phim đang chiếu
          </span>
          <span
            rel="noopener noreferrer"
            className={`px-5 py-1 border-b-2 dark:border-gray-700 transition duration-300 ${styleSlick[atvClassSapChieu]} `}
            onClick={() => {
              dispatch({ type: SET_FILM_SAP_CHIEU });
            }}
          >
            Phim sắp chiếu
          </span>
        </div>
        <Slider {...settings} className="xl:px-16 2xl:px-32 dark:bg-gray-900 ">
          {renderFilm()}
          {renderFilm()}
          {renderFilm()}
          {renderFilm()}
          {renderFilm()}
          {renderFilm()}
          {renderFilm()}
          {renderFilm()}
        </Slider>
      </div>
    </AnimationOnScroll>
  );
};

export default MultipleRowSlick;
