import {
  DANG_NHAP,
  GET_LIST_TYPE_USER,
  GET_LIST_USER,
  GET_THONG_TIN_USER,
} from "../types/QuanLyUserConst";
import { TOKEN, USER_LOGIN } from "../../util/settings/config";
import { ThongTinUser } from "../../_core/models/ThongTinUser";
import { DanhSachUser } from "../../_core/models/DanhSachUser";

// kiểm tra thông tin đăng nhập người dùng đã có chưa nếu rồi ko cần phải đăng nhập lại
let user = {};
if (localStorage.getItem(USER_LOGIN)) {
  user = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {
  userLogin: user,
  thongTinUser: new ThongTinUser(),
  danhSachUser: [],
  danhSachLoaiUser: [],
};

export const QuanLyUserReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case DANG_NHAP:
      // lưu lại thông tin đăng nhập người dùng vào Localstorage
      const { thongTinLogin } = action;
      localStorage.setItem(USER_LOGIN, JSON.stringify(thongTinLogin));
      // lưu Token người dùng vào localStorage (lấy accessToken phụ thuộc API trả về dạng gì)
      localStorage.setItem(TOKEN, thongTinLogin.accessToken);
      return { ...state, userLogin: thongTinLogin };
    case GET_THONG_TIN_USER:
      return { ...state, thongTinUser: action.thongTinUser };
    case GET_LIST_USER:
      return { ...state, danhSachUser: action.danhSachUser };
    case GET_LIST_TYPE_USER:
      return { ...state, danhSachLoaiUser: action.danhSachLoaiUser };
    default:
      return { ...state };
  }
};
