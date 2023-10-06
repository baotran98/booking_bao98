import { baseService } from "./baseService";
import { GROUPID } from "../util/settings/config";

export class QuanLyRapService extends baseService {
  constructor() {
    super();
  }
  // lấy dữ liệu Banner
  layDanhSachCumRap = () => {
    return this.get(
      `/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUPID}`
    );
  };
  // lấy thông tin lịch chiếu phim
  layThongTinLichChieuPhim = (maPhim) => {
    return this.get(`/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`);
  };
  // lấy thông tin hệ thống rạp
  layThongTinHeThongRap = () => {
    return this.get(`/api/QuanLyRap/LayThongTinHeThongRap`);
  };
  // lấy thông tin cụm rạp theo mã hệ thống rạp
  layThongTinCumRap = (maHeThong) => {
    return this.get(
      `/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThong}`
    );
  };
  // tạo lịch chiếu
  taoLichChieu = (lich) => {
    return this.post(`/api/QuanLyDatVe/TaoLichChieu`, lich);
  };
}
export const quanLyRapService = new QuanLyRapService();
