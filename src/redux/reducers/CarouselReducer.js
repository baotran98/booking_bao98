import { SET_CAROUSEL } from "../types/CarouselConst";

const stateDefault = {
  arrImage: [
    {
      maBanner: 1,
      maPhim: 1282,
      hinhAnh: "http://movieapi.cyberlearn.vn/hinhanh/ban-tay-diet-quy.png",
    },
  ],
};

export const CarouselReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case SET_CAROUSEL:
      return { ...state, arrImage: action.arrImage };

    default:
      return { ...state };
  }
};
