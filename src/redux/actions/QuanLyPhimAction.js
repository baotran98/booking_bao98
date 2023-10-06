import Swal from "sweetalert2";
import { quanLyPhimService } from "../../services/QuanLyPhimService";
import { GET_INFO_FILM, GET_LIST_FILM } from "../types/QuanLyPhimConst";

// get dữ liệu phim Action
export const getPhimAction = (tenPhim = "") => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.layDanhSachPhim(tenPhim);
      // console.log("List film", result);
      // đưa dữ liệu lấy về từ API lên Reducer
      dispatch({
        type: GET_LIST_FILM,
        arrPhim: result.data.content,
      });
    } catch (error) {
      console.log("errors", error.response?.data);
    }
  };
};
// thêm phim mới Action
export const themPhimMoiUpLoadHinhAction = (formData) => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.themPhimUpLoadHinh(formData);
      if (result.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Thêm phim mới thành công",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      // console.log("Thêm phim mới", result);
    } catch (error) {
      console.log(error.response?.data);
    }
  };
};
// lấy thông tin phim Action
export const layThongTinPhimAction = (maPhim) => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.layThongTinPhim(maPhim);
      if (result.status === 200) {
        dispatch({
          type: GET_INFO_FILM,
          thongTinPhim: result.data.content,
        });
      }
      // console.log("Thông tin phim", result);
    } catch (error) {
      console.log(error.response?.data);
    }
  };
};
// cập nhật lại phim Action
export const capNhatPhimUploadAction = (formData) => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.capNhatPhimUpload(formData);
      if (result.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Cập nhật thành công",
          showConfirmButton: false,
          timer: 1500,
        });
        // console.log("Cập nhật phim", result);
      }
    } catch (error) {
      console.log(error.response?.data);
    }
  };
};
// xóa phim Action
export const xoaPhimAction = (maPhim) => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.xoaPhim(maPhim);
      if (result.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Xóa phim thành công",
          showConfirmButton: false,
          timer: 1500,
        });
        await dispatch(getPhimAction());
        // console.log("Xóa phim", result);
      }
    } catch (error) {
      console.log(error.response?.data);
    }
  };
};
