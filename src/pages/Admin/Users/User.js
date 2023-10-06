import React, { useEffect, useState } from "react";
import { Table, Input, Popover, message, Popconfirm, Tag } from "antd";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../../../App";
import {
  layDanhSachNguoiDungAction,
  timKiemNguoiDungAction,
  xoaNguoiDungAction,
} from "../../../redux/actions/QuanLyUserAction";

const { Search } = Input;

const confirm = (e) => {
  console.log(e);
  message.success("Click on Yes");
};

const cancel = (e) => {
  console.log(e);
  message.error("Click on No");
};

export default function User(props) {
  const { danhSachUser } = useSelector((state) => state.QuanLyUserReducer);
  const data = danhSachUser;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(layDanhSachNguoiDungAction());
  }, []);

  const onSearch = (value) => {
    dispatch(layDanhSachNguoiDungAction(value));
    console.log({ value });
  };

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const columns = [
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
      sortDirections: ["descend", "ascend"],
      // defaultSortOrder: "descend",
      sorter: (a, b) => {
        let taiKhoanA = a.taiKhoan.toLowerCase().trim();
        let taiKhoanB = b.taiKhoan.toLowerCase().trim();
        if (taiKhoanA > taiKhoanB) {
          return 1;
        }
        return -1;
      },
      render: (text, item) => {
        return (
          <div key={item.taiKhoan}>
            <div>{item.taiKhoan}</div>
          </div>
        );
      },
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      sortDirections: ["descend", "ascend"],
      // defaultSortOrder: "descend",
      sorter: (a, b) => {
        let hoTenA = a.hoTen.toLowerCase().trim();
        let hoTenB = b.hoTen.toLowerCase().trim();
        if (hoTenA > hoTenB) {
          return 1;
        }
        return -1;
      },
      render: (text, item) => {
        return (
          <div key={item.hoTen}>
            <div>{item.hoTen}</div>
          </div>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => {
        let emailA = a.email.toLowerCase().trim();
        let emailB = b.email.toLowerCase().trim();
        if (emailA > emailB) {
          return 1;
        }
        return -1;
      },
      render: (text, item) => {
        return (
          <div key={item.email}>
            <div>{item.email}</div>
          </div>
        );
      },
    },

    {
      title: "Số điện thoại",
      dataIndex: "soDt",
      render: (text, item) => {
        return (
          <div key={item.soDt}>
            <div>{item.soDt}</div>
          </div>
        );
      },
    },
    {
      title: "Loại người dùng",
      dataIndex: "maLoaiNguoiDung",
      sorter: (a, b) => {
        let maLoaiNguoiDungA = a.maLoaiNguoiDung.toLowerCase().trim();
        let maLoaiNguoiDungB = b.maLoaiNguoiDung.toLowerCase().trim();
        if (maLoaiNguoiDungA > maLoaiNguoiDungB) {
          return 1;
        }
        return -1;
      },
      render: (text, item) => {
        let color = item.maLoaiNguoiDung === "QuanTri" ? "volcano" : "green";
        return (
          <div key={item.maLoaiNguoiDung}>
            <Tag color={color}>{item.maLoaiNguoiDung}</Tag>
          </div>
        );
      },
    },
    {
      title: "Hành động",
      dataIndex: "action",
      render: (text, item) => {
        return (
          <div className="flex justify-center items-center">
            <Popover
              content={<span className="font-bold">Chỉnh sửa người dùng</span>}
              trigger="hover"
            >
              <EditTwoTone
                onClick={() => {
                  history.push(`/admin/user/edituser/${item.taiKhoan}`);
                  localStorage.setItem("userParams", JSON.stringify(item));
                }}
                twoToneColor="#0EA5E9"
                className="w-5 cursor-pointer mr-3"
                style={{ fontSize: "1rem" }}
              />
            </Popover>
            <Popover
              content={<span className="font-bold">Xóa người dùng</span>}
              trigger="hover"
            >
              <Popconfirm
                title={`Bạn muốn xóa người dùng ${item.taiKhoan}?`}
                onConfirm={() => {
                  dispatch(xoaNguoiDungAction(item.taiKhoan));
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
          </div>
        );
      },
    },
  ];

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
          <div className="text-2xl font-bold text-gray-800 ">
            Quản Lý Người Dùng
          </div>
        </div>
      </div>

      <Search
        className="my-5 hover:shadow-lg transition duration-300"
        placeholder="Nhập dữ liệu người dùng bạn muốn tìm.... "
        onSearch={onSearch}
        allowClear
        enterButton
      />
      <Table
        className="animate__animated animate__fadeIn"
        columns={columns}
        dataSource={data.slice(0, 50)}
        onChange={onChange}
        rowKey={"taiKhoan"}
      />
    </>
  );
}
