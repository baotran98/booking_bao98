import { GET_LIST_CUM_RAP } from "../types/QuanLyRapConst";

const stateDefault = {
  heThongCumRap: [],
};

export const QuanLyRapReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_LIST_CUM_RAP:
      return { ...state, heThongCumRap: action.heThongCumRap };

    default:
      return { ...state };
  }
};
