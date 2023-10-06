import React, { useEffect } from "react";
import HomeMenu from "./HomeMenu/HomeMenu";
import MultipleRowSlick from "../../components/ReactSlick/MultipleRowSlick";
import { useSelector, useDispatch } from "react-redux";
import { getPhimAction } from "../../redux/actions/QuanLyPhimAction";
import { getCumRapAction } from "../../redux/actions/QuanLyRapAction";
import CarouselHome from "../../templates/Home/Layout/CarouselHome/CarouselHome";

export default function Home(props) {
  const { arrPhim } = useSelector((state) => state.QuanLyPhimReducer);
  const { heThongCumRap } = useSelector((state) => state.QuanLyRapReducer);

  // useDispatch đưa dữ liệu từ API lên Reducer
  const dispatch = useDispatch();
  // dùng Effect để lấy dữ liệu từ API về component
  useEffect(() => {
    dispatch(getPhimAction());
    dispatch(getCumRapAction());
  }, []);
  return (
    <>
      <CarouselHome />
      <div className="dark:bg-gray-900">
        <div className="mx-auto xl:px-0 2xl:px-16 py-5">
          <MultipleRowSlick arrFilm={arrPhim} />
        </div>

        <div className="mx-32 py-10" id="cumRap">
          <HomeMenu heThongCumRap={heThongCumRap} />
        </div>
      </div>
    </>
  );
}
