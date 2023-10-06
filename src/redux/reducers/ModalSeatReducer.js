import { CLOSE_MODAL, OPEN_MODAL } from "../types/ModalSeatConst";

const stateDefault = {
  isModalVisible: false,
  componentSeat: <p>Content Modal</p>,
};

export const ModalSeatReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return { ...state, isModalVisible: true };
    case CLOSE_MODAL:
      return { ...state, isModalVisible: false };
    default:
      return { ...state };
  }
};
