/* eslint-disable no-useless-constructor */
import { GROUPID } from "../util/settings/config";
import { baseService } from "./baseService";

export class QuanLyUserService extends baseService {
  constructor() {
    super();
  }
  // Đăng nhập
  dangNhap = (thongTinLogin) => {
    return this.post(`/api/QuanLyNguoiDung/DangNhap`, thongTinLogin);
  };
  // Đăng ký
  dangKy = (nd) => {
    return this.post(`/api/QuanLyNguoiDung/DangKy`, nd);
  };
  // lấy thông tin người dùng
  layThongTinUser = () => {
    return this.post(`/api/QuanLyNguoiDung/ThongTinTaiKhoan`);
  };
  // lấy mã loại người dùng
  layDanhSachLoaiNguoiDung = () => {
    return this.get(`/api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung`);
  };
  // sửa thông tin cá nhân (Client)
  capNhatThongTinNguoiDung = (nd) => {
    return this.put(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, nd);
  };
  // lấy danh sách người dùng (Admin)
  layDanhSachNguoiDung = (tuKhoa = "") => {
    if (tuKhoa.trim() !== "") {
      return this.get(
        `/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP00&tuKhoa=${tuKhoa}`
      );
    } else {
      return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP00`);
    }
  };
  // thêm người dùng (Admin)
  themNguoiDung = (nd) => {
    return this.post(`/api/QuanLyNguoiDung/ThemNguoiDung`, nd);
  };
  // sửa thông tin người dùng (Admin)
  thayDoiThongTinNguoiDung = (nd) => {
    return this.post(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, nd);
  };
  // xóa người dùng khỏi danh sách (Admin)
  xoaNguoiDung = (taiKhoan) => {
    return this.delete(
      `/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`
    );
  };
  // tìm kiếm người dùng
  timKiemNguoiDung = (tuKhoa) => {
    return this.get(
      `/api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP00&tuKhoa=${tuKhoa}`
    );
  };
}
export const quanLyUserService = new QuanLyUserService();
