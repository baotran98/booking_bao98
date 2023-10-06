import { quanLyPhimService } from "../../services/QuanLyPhimService";
import { SET_CAROUSEL } from "../types/CarouselConst";

// get dữ liệu
export const getCarouselAction = () => {
  return async (dispatch) => {
    try {
      // sử dụng tham số vào url
      const result = await quanLyPhimService.layDanhSachBanner();
      // console.log("List banner", result);
      // đưa dữ liệu lấy về từ API lên Reducer
      dispatch({
        type: SET_CAROUSEL,
        arrImage: result.data.content,
      });
    } catch (error) {
      console.log("errors", error);
    }
  };
};
