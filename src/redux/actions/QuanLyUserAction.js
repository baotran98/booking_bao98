import Swal from "sweetalert2";
import { history } from "../../App";
import { quanLyUserService } from "../../services/QuanLyUserService";
import {
  DANG_NHAP,
  GET_LIST_TYPE_USER,
  GET_LIST_USER,
  GET_THONG_TIN_USER,
} from "../types/QuanLyUserConst";

// đăng nhập Action
export const dangNhapAction = (thongTinLogin) => {
  return async (dispatch) => {
    try {
      const result = await quanLyUserService.dangNhap(thongTinLogin);
      console.log("Login", result);
      // đưa dữ liệu lấy về từ API lên Reducer
      if (result.data.statusCode === 200) {
        dispatch({
          type: DANG_NHAP,
          thongTinLogin: result.data.content,
        });
        // nếu đăng nhập thành công sẽ chuyển về trang trước đó
        // history.goBack();
        history.push("/");
      }
    } catch (error) {
      console.log(error.response?.data);
    }
  };
};
// đăng ký Action
export const dangKyAction = (nd) => {
  return async (dispatch) => {
    try {
      const result = await quanLyUserService.dangKy(nd);
      if (result.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Đăng ký thành công",
          showConfirmButton: false,
          timer: 1500,
        });
        history.push("/login");
      }
      // console.log("Regis success", result);
    } catch (error) {
      if (error.response.data.statusCode === 400) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: `${error.response.data.content}`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      // console.log(error.response?.data);
    }
  };
};
// lấy thông tin tin người dùng
export const layThongTinUserAction = () => {
  return async (dispatch) => {
    try {
      const result = await quanLyUserService.layThongTinUser();
      // đưa dữ liệu lấy từ API lên Reducer
      if (result.status === 200) {
        dispatch({
          type: GET_THONG_TIN_USER,
          thongTinUser: result.data.content,
        });
      }
      // console.log("Thông tin user", result);
    } catch (error) {
      console.log(error.response?.data);
    }
  };
};
// sửa thông tin người dùng Action (Client,Admin)
export const updateThongTinUserAction = (nd) => {
  return async (dispatch) => {
    try {
      const result = await quanLyUserService.capNhatThongTinNguoiDung(nd);
      if (result.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Thay đổi thành công",
          showConfirmButton: false,
          timer: 1500,
        });
        await dispatch(layThongTinUserAction());
      }
      // console.log("Update success", result);
    } catch (error) {
      if (error.response.data.statusCode === 500) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: `${error.response.data.content}`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      // console.log(error.response?.data);
    }
  };
};
// lấy danh sách loại người dùng Action (Admin)
export const layDanhSachLoaiNguoiDungAction = () => {
  return async (dispatch) => {
    try {
      const result = await quanLyUserService.layDanhSachLoaiNguoiDung();
      if (result.status === 200) {
        dispatch({
          type: GET_LIST_TYPE_USER,
          danhSachLoaiUser: result.data.content,
        });
        // console.log("Get list code user ", result);
      }
    } catch (error) {
      console.log(error.response?.data);
    }
  };
};
// lấy danh sách người dùng Action (Admin)
export const layDanhSachNguoiDungAction = (tuKhoa = "") => {
  return async (dispatch) => {
    try {
      const result = await quanLyUserService.layDanhSachNguoiDung(tuKhoa);
      if (result.status === 200) {
        // đưa dữ liệu lấy về từ API lên Reducer
        dispatch({
          type: GET_LIST_USER,
          danhSachUser: result.data.content,
        });
      }
      // console.log("Get list user success", result);
    } catch (error) {
      console.log(error.response?.data);
    }
  };
};
// thêm người dùng Action (Admin)
export const themNguoiDungAction = (nd) => {
  return async (dispatch) => {
    try {
      const result = await quanLyUserService.themNguoiDung(nd);
      if (result.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Thêm người dùng thành công",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      // console.log("Add user successful", result);
    } catch (error) {
      if (error.response.data.statusCode === 500) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: `${error.response.data.content}`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      // console.log(error.response?.data);
    }
  };
};
export const thayDoiThongTinNguoiDungAction = (nd) => {
  return async (dispatch) => {
    try {
      const result = await quanLyUserService.thayDoiThongTinNguoiDung(nd);
      if (result.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Thay đổi thành công",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      // console.log("Update success", result);
    } catch (error) {
      if (error.response.data.statusCode === 500) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: `${error.response.data.content}`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      // console.log(error.response?.data);
    }
  };
};
// xóa người dùng Action (Admin)
export const xoaNguoiDungAction = (taiKhoan) => {
  return async (dispatch) => {
    try {
      const result = await quanLyUserService.xoaNguoiDung(taiKhoan);
      if (result.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Xóa thành công",
          showConfirmButton: false,
          timer: 1500,
        });
        await dispatch(layDanhSachNguoiDungAction());
      }
      // console.log("Delete user success", result);
    } catch (error) {
      if (error.response.data.statusCode === 500) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: `${error.response.data.content}`,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: `Bạn không đủ quyền để thay đổi !`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      console.log(error.response?.data);
    }
  };
};
// tìm kiếm người dùng Action (Admin)
export const timKiemNguoiDungAction = (tuKhoa) => {
  return async (dispatch) => {
    try {
      const result = await quanLyUserService.timKiemNguoiDung(tuKhoa);
      console.log("Search successful", result);
    } catch (error) {
      console.log(error.response?.data);
    }
  };
};
