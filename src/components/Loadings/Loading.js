import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { showLoadingAction } from "../../redux/actions/LoadingAction";
import "./css/Loading.css";

export default function Loading(props) {
  const { isLoading } = useSelector((state) => state.LoadingReducer);
  const dispatch = useDispatch();
  useEffect(() => {}, []);
  return isLoading ? (
    <div className="inset-0 dark:bg-gray-900 w-screen h-screen opacity-90 fixed z-50 flex justify-center items-center">
      <img
        className="w-60 h-40"
        src="https://acegif.com/wp-content/uploads/loading-87.gif"
        alt="loading"
      />
    </div>
  ) : (
    ""
  );
}
