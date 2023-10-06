import React, { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { CLOSE_MODAL_VIDEO } from "../../redux/types/ModalVideoConst";
import "./css/modalVideo.css";

export default function App() {
  const [videoLoading, setVideoLoading] = useState(true);
  const { modal } = useSelector((state) => state.ModalVideoReducer);

  const dispatch = useDispatch();

  // lấy thông tin phim từ LocalStorage
  let phim = [];
  if (localStorage.getItem("trailerParams")) {
    phim = JSON.parse(localStorage.getItem("trailerParams"));
  }

  const spinner = () => {
    setVideoLoading(!videoLoading);
  };

  return (
    <div>
      {modal ? (
        <section className="modal__bg">
          <div className="modal__align">
            <div className="modal__content" modal={modal}>
              <button
                className="h-8 w-8 left-full bottom-5 text-violet-50 rounded-full border-violet-50 border-2 relative cursor-pointer z-10 transition ease-in-out duration-300 hover:text-gray-300 hover:border-gray-300 hover:scale-125"
                arial-label="Close modal"
                onClick={() => {
                  dispatch({
                    type: CLOSE_MODAL_VIDEO,
                  });
                }}
              >
                X
              </button>
              <div className="modal__video-align">
                {videoLoading ? (
                  <div className="modal__spinner">
                    <LoadingOutlined
                      className="modal__spinner-style"
                      fadeIn="none"
                    />
                  </div>
                ) : null}
                <iframe
                  className="modal__video-style"
                  onLoad={spinner}
                  loading="lazy"
                  width="800"
                  height="500"
                  src={phim.trailer}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                  autoplay
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
