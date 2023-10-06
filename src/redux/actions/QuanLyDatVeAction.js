import { quanLyDatVeService } from "../../services/QuanLyDatVeService";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
import {
  DAT_VE_HOAN_TAT,
  LAY_CHI_TIET_PHONG_VE,
  MOVE_TAB,
} from "../types/QuanLyDatVeConst";
import Swal from "sweetalert2";
import { hideLoadingAction, showLoadingAction } from "./LoadingAction";

// lấy danh sách phòng vé
export const QuanLyDatVeAction = (maLichChieu) => {
  return async (dispatch) => {
    try {
      dispatch(showLoadingAction);
      const result = await quanLyDatVeService.layDanhSachPhongVe(maLichChieu);
      if (result.status === 200) {
        // đưa dữ liệu lên reducer
        dispatch({
          type: LAY_CHI_TIET_PHONG_VE,
          chiTietPhongVe: result.data.content,
        });
      }
      await dispatch(hideLoadingAction);
      console.log({ result });
    } catch (error) {
      await dispatch(hideLoadingAction);
      console.log(error.response?.data);
    }
  };
};
// gửi danh sách vé
export const datVeAction = (thongTinDatVe = new ThongTinDatVe()) => {
  return async (dispatch) => {
    try {
      const result = await quanLyDatVeService.datVe(thongTinDatVe);
      if (result.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Đặt vé thành công",
          showConfirmButton: false,
          timer: 1500,
        });
        await dispatch({ type: DAT_VE_HOAN_TAT });
        await dispatch(QuanLyDatVeAction(thongTinDatVe.maLichChieu));
        await dispatch({ type: MOVE_TAB });
      }
      console.log("Đặt vé", result);
    } catch (error) {
      console.log(error.response?.data);
    }
  };
};
