import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "antd";
import { CLOSE_MODAL } from "../../../redux/types/ModalSeatConst";
import VirtualList from "rc-virtual-list";
import { List } from "antd";

const ContainerHeight = 400;

export default function ModalSeat(props) {
  const { isModalVisible } = useSelector((state) => state.ModalSeatReducer);

  const dispatch = useDispatch();

  // lấy thông tin ghế từ LocalStorage
  let listSeat = [];
  if (localStorage.getItem("seatParams")) {
    listSeat = JSON.parse(localStorage.getItem("seatParams"));
  }

  const handleOk = () => {
    dispatch({
      type: CLOSE_MODAL,
    });
  };

  const handleCancel = () => {
    dispatch({
      type: CLOSE_MODAL,
    });
  };

  const onScroll = (e) => {
    if (
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      ContainerHeight
    ) {
      return listSeat;
    }
  };

  return (
    <div>
      <Modal
        title={
          <div className="text-xl font-bold">
            Danh sách ghế -{" "}
            <span className="text-violet-500">{listSeat.tenPhim}</span>
          </div>
        }
        visible={isModalVisible}
        width={750}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <List>
          <VirtualList
            data={listSeat.danhSachGhe}
            height={ContainerHeight}
            itemHeight={47}
            itemKey="maGhe"
            onScroll={onScroll}
          >
            {(item) => (
              <List.Item key={item.maGhe}>
                <List.Item.Meta
                  avatar={
                    <img
                      className="w-10"
                      src="https://cdn2.iconfinder.com/data/icons/movie-theatre/480/movie_chair_cinema_theater_seat-512.png"
                      alt={item.maGhe}
                    />
                  }
                  title={
                    <div className="font-bold">
                      Cụm rạp:{" "}
                      <span className="text-base text-violet-800">
                        {item.tenCumRap}
                      </span>
                    </div>
                  }
                  description={
                    <div className="font-bold">
                      Hệ thống:{" "}
                      <span className="text-base text-violet-400">
                        {item.tenHeThongRap}
                      </span>
                    </div>
                  }
                />
                <div className="font-bold">
                  Số ghế:{" "}
                  <span className="text-base text-violet-500">
                    {item.tenGhe}
                  </span>
                </div>
              </List.Item>
            )}
          </VirtualList>
        </List>
      </Modal>
    </div>
  );
}
