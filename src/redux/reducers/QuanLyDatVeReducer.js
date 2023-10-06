import { ThongTinLichChieu } from "../../_core/models/ThongTinPhongVe";
import {
  CHANGE_TAB,
  DAT_VE,
  DAT_VE_HOAN_TAT,
  LAY_CHI_TIET_PHONG_VE,
  MOVE_TAB,
} from "../types/QuanLyDatVeConst";

const stateDefault = {
  chiTietPhongVe: new ThongTinLichChieu(),
  danhSachGheDangDat: [],
  danhSachGheDatCungLuc: [{ maGhe: 61161 }, { maGhe: 61162 }],
  tabActive: "1",
};

export const QuanLyDatVeReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case LAY_CHI_TIET_PHONG_VE:
      return { ...state, chiTietPhongVe: action.chiTietPhongVe };
    case DAT_VE:
      // cập nhật danh sách ghế đang đặt
      let danhSachGheCapNhat = [...state.danhSachGheDangDat];

      let index = danhSachGheCapNhat.findIndex(
        (gheDD) => gheDD.maGhe === action.gheDuocChon.maGhe
      );
      if (index !== -1) {
        // nếu tìm thấy ghế được chọn trong mảng có nghĩa là trước đó đã đc chọn và giờ cần xóa đi
        danhSachGheCapNhat.splice(index, 1);
      } else {
        danhSachGheCapNhat.push(action.gheDuocChon);
      }

      return { ...state, danhSachGheDangDat: danhSachGheCapNhat };
    case DAT_VE_HOAN_TAT:
      return { ...state, danhSachGheDangDat: [] };
    case MOVE_TAB:
      return { ...state, tabActive: "2" };
    case CHANGE_TAB:
      return { ...state, tabActive: action.number };
    default:
      return { ...state };
  }
};
