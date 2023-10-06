import { HIDE_LOADING, SHOW_LOADING } from "../types/LoadingConst";

const stateDefault = {
  isLoading: false,
};

export const LoadingReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case SHOW_LOADING:
      return { ...state, isLoading: true };
    case HIDE_LOADING:
      return { ...state, isLoading: false };
    default:
      return { ...state };
  }
};
