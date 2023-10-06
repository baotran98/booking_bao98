import React, { useEffect } from "react";
import { Carousel } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getCarouselAction } from "../../../../redux/actions/CarouselAction";
import "./CarouselHome.css";

// antd
const contentStyle = {
  height: "auto",
  color: "#fff",
  lineHeight: "120px",
  textAlign: "center",
  backgroundPosition: "center",
  backgroundSize: "100%",
  backgroundRepeat: "no-repeat",
};

export default function CarouselHome(props) {
  // useSelect lấy dữ liệu từ Reducer về
  const { arrImage } = useSelector((state) => state.CarouselReducer);
  // useDispacth
  const dispatch = useDispatch();
  // useEffect lấy dữ liệu từ API về thông qua async await
  // tự kích hoạt dữ liệu khi load component
  useEffect(() => {
    // loại 1: action = {type:"",data}
    // loại 2: sử dụng Middleware(redux thunk) => callBackFunction (dispatch)
    // let action = getCarouselAction();
    dispatch(getCarouselAction());
    // [] => chỉ render component 1 lần
  }, []);
  // render Image cho Carousel
  const renderImage = () => {
    return arrImage.map((image) => {
      return (
        <div key={image.maBanner}>
          <div
            className=""
            // dùng backgroundImage để set cứng hình thay cho img tránh bị vỡ hình khi responsive
            style={{
              ...contentStyle,
              backgroundImage: `url(${image.hinhAnh})`,
            }}
          >
            <img
              className="xl:h-auto 2xl:h-screen 2xl:w-full opacity-0"
              src={image.hinhAnh}
              alt={image.maPhim}
            />
          </div>
        </div>
      );
    });
  };
  return (
    <>
      <Carousel effect="fade" className="z-0" autoplay>
        {renderImage()}
      </Carousel>
    </>
  );
}
