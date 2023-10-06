import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { CarouselReducer } from "./reducers/CarouselReducer";
import { LoadingReducer } from "./reducers/LoadingReducer";
import { ModalSeatReducer } from "./reducers/ModalSeatReducer";
import { ModalVideoReducer } from "./reducers/ModalVideoReducer";
import { QuanLyDatVeReducer } from "./reducers/QuanLyDatVeReducer";
import { QuanLyPhimReducer } from "./reducers/QuanLyPhimReducer";
import { QuanLyRapReducer } from "./reducers/QuanLyRapReducer";
import { QuanLyUserReducer } from "./reducers/QuanLyUserReducer";

const rootReducer = combineReducers({
  // nhúng state ứng dụng
  CarouselReducer,
  QuanLyPhimReducer,
  QuanLyRapReducer,
  QuanLyUserReducer,
  QuanLyDatVeReducer,
  LoadingReducer,
  ModalSeatReducer,
  ModalVideoReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
