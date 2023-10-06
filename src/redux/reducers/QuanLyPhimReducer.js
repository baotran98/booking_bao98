import {
  GET_DETAIL_FILM,
  GET_INFO_FILM,
  GET_LIST_FILM,
  SET_FILM_DANG_CHIEU,
  SET_FILM_SAP_CHIEU,
} from "../types/QuanLyPhimConst";

const stateDefault = {
  arrPhim: [
    // dữ liệu mặc định
    {
      maPhim: 10542,
      tenPhim: "MÈO ĐI HIA: ĐIỀU ƯỚC CUỐI CÙNG 2",
      biDanh: "meo-di-hia-dieu-uoc-cuoi-cung2",
      trailer: "https://www.youtube.com/watch?v=ixFHgfKr39Y",
      hinhAnh:
        "http://movieapi.cyberlearn.vn/hinhanh/meo-di-hia-dieu-uoc-cuoi-cung1_gp01.png",
      moTa: "Phần nối tiếp của Puss in Boots đã ra mắt từ 11 năm trước. Chú mèo đi hia sẽ chính thức trở lại màn ảnh lớn trong 1 chuyến phiêu lưu mới, vui nhộn hơn và cũng gay cấn hơn khi đã trót “tiêu xài” 8 trong số 9 cái mạng của mình.",
      maNhom: "GP01",
      ngayKhoiChieu: "2022-07-24T09:03:34.73",
      danhGia: 10,
      hot: true,
      dangChieu: true,
      sapChieu: true,
    },
  ],
  dangChieu: true,
  sapChieu: false,
  // tạo mảng phim mặc định để filter đầy đủ hơn
  arrPhimDefault: [],
  detailFilm: [],
  thongTinPhim: [],
};

export const QuanLyPhimReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_LIST_FILM:
      return {
        ...state,
        arrPhim: action.arrPhim,
        arrPhimDefault: action.arrPhim,
      };
    case SET_FILM_DANG_CHIEU:
      state.dangChieu = !state.dangChieu;
      state.arrPhim = state.arrPhimDefault.filter(
        (film) => film.dangChieu === state.dangChieu
      );
      return { ...state };
    case SET_FILM_SAP_CHIEU:
      state.sapChieu = !state.sapChieu;
      state.arrPhim = state.arrPhimDefault.filter(
        (film) => film.sapChieu === state.sapChieu
      );
      return { ...state };
    case GET_DETAIL_FILM:
      return { ...state, detailFilm: action.detailFilm };
    case GET_INFO_FILM:
      return { ...state, thongTinPhim: action.thongTinPhim };
    default:
      return { ...state };
  }
};
