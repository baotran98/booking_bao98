import React, { useEffect } from "react";
import { Table, Input, Popover, message, Popconfirm } from "antd";
import { DeleteTwoTone, EditTwoTone, CalendarTwoTone } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  getPhimAction,
  xoaPhimAction,
} from "../../../redux/actions/QuanLyPhimAction";
import { history } from "../../../App";

const { Search } = Input;

const confirm = (e) => {
  console.log(e);
  message.success("Click on Yes");
};

const cancel = (e) => {
  console.log(e);
  message.error("Click on No");
};

export default function Film(props) {
  const { arrPhimDefault } = useSelector((state) => state.QuanLyPhimReducer);
  const data = arrPhimDefault;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPhimAction());
  }, []);

  const onSearch = (value) => {
    dispatch(getPhimAction(value));
    console.log({ value });
  };

  const columns = [
    {
      title: "Mã",
      dataIndex: "maPhim",
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      sortDirections: ["descend", "ascend"],
      defaultSortOrder: "descend", // sắp xếp phim mới nhất lên đầu tiên làm mặc định
      sorter: (a, b) => a.maPhim - b.maPhim,
    },
    {
      title: "Tên phim",
      dataIndex: "tenPhim",
      sortDirections: ["descend", "ascend"],
      // defaultSortOrder: "descend",
      sorter: (a, b) => {
        let tenPhimA = a.tenPhim.toLowerCase().trim();
        let tenPhimB = b.tenPhim.toLowerCase().trim();
        if (tenPhimA > tenPhimB) {
          return 1;
        }
        return -1;
      },
      render: (text, film) => {
        return (
          <div key={film.maPhim}>
            <div>{film.tenPhim}</div>
          </div>
        );
      },
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      render: (text, film) => {
        return (
          <div className="w-14 ">
            <img
              className="rounded shadow-md"
              src={film.hinhAnh}
              alt={film.maPhim}
            />
          </div>
        );
      },
    },
    {
      title: "Mô tả",
      dataIndex: "moTa",
      render: (text, film) => {
        return (
          <div>
            {film.moTa.length > 80 ? (
              <span>{film.moTa.slice(0, 80)}...</span>
            ) : (
              <span>{film.moTa}</span>
            )}
          </div>
        );
      },
    },
    {
      title: "Hành động",
      dataIndex: "action",
      render: (text, film) => {
        return (
          <div className="flex justify-center items-center">
            <Popover
              content={<span className="font-bold">Chỉnh sửa phim</span>}
              trigger="hover"
            >
              <EditTwoTone
                onClick={() => {
                  history.push(`/admin/film/editfilm/${film.maPhim}`);
                }}
                twoToneColor="#0EA5E9"
                className="w-5 cursor-pointer mr-3"
                style={{ fontSize: "1rem" }}
              />
            </Popover>
            <Popover
              content={<span className="font-bold">Xóa phim</span>}
              trigger="hover"
            >
              <Popconfirm
                title={`Bạn muốn xóa phim ${film.tenPhim}?`}
                onConfirm={() => {
                  dispatch(xoaPhimAction(film.maPhim));
                }}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <DeleteTwoTone
                  twoToneColor="#EF4444"
                  className="w-5 cursor-pointer mr-3"
                  style={{ fontSize: "1rem" }}
                />
              </Popconfirm>
            </Popover>
            <Popover
              content={<span className="font-bold">Tạo lịch chiếu</span>}
              trigger="hover"
            >
              <CalendarTwoTone
                onClick={() => {
                  history.push(`/admin/film/showtime/${film.maPhim}`);
                  localStorage.setItem("filmParams", JSON.stringify(film));
                }}
                twoToneColor="#14B8A6"
                className="w-5 cursor-pointer "
                style={{ fontSize: "1rem" }}
              />
            </Popover>
          </div>
        );
      },
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <>
      <div className="flex justify-center">
        <div
          className="flex justify-center items-center w-1/2 h-20 rounded shadow-lg -mt-16 bg-opacity-80 animate__animated animate__fadeInDown"
          style={{
            backgroundImage:
              "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)",
          }}
        >
          <div className="text-2xl font-bold text-gray-800 ">Quản Lý Phim</div>
        </div>
      </div>

      <Search
        className="my-5 hover:shadow-lg transition duration-300"
        placeholder="Nhập tên phim bạn muốn tìm.... "
        onSearch={onSearch}
        enterButton
      />

      <Table
        className="animate__animated animate__fadeIn"
        columns={columns}
        dataSource={data}
        onChange={onChange}
        rowKey={"maPhim"}
      />
    </>
  );
}
