import { CLOSE_MODAL_VIDEO, OPEN_MODAL_VIDEO } from "../types/ModalVideoConst";

const stateDefault = {
  modal: false,
};

export const ModalVideoReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case OPEN_MODAL_VIDEO:
      return { ...state, modal: true };
    case CLOSE_MODAL_VIDEO:
      return { ...state, modal: false };
    default:
      return { ...state };
  }
};
