import { quanLyRapService } from "../../services/QuanLyRapService";
import { GET_DETAIL_FILM } from "../types/QuanLyPhimConst";
import { GET_LIST_CUM_RAP } from "../types/QuanLyRapConst";

// get dữ liệu cụm rạp
export const getCumRapAction = () => {
  return async (dispatch) => {
    try {
      const result = await quanLyRapService.layDanhSachCumRap();
      // console.log("List Cum Rap", result);
      // đưa dữ liệu lầy về từ API lên Reducer
      dispatch({
        type: GET_LIST_CUM_RAP,
        heThongCumRap: result.data.content,
      });
    } catch (error) {
      console.log("errors", error);
    }
  };
};
// get chi tiết phim
export const getThongTinChiTietPhim = (id) => {
  return async (dispatch) => {
    try {
      const result = await quanLyRapService.layThongTinLichChieuPhim(id);
      // đưa dữ liệu lấy về từ API lên Reducer
      dispatch({
        type: GET_DETAIL_FILM,
        detailFilm: result.data.content,
      });
      // console.log({ result });
    } catch (error) {
      console.log("errors", error);
    }
  };
};
