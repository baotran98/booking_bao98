/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { Button, DatePicker, Form, Space, InputNumber, Select } from "antd";
import moment from "moment";
import { quanLyRapService } from "../../../../services/QuanLyRapService";
import Swal from "sweetalert2";

const Showtime = (props) => {
  const [state, setState] = useState({
    heThongRapChieu: [],
    cumRapChieu: [],
  });

  const dispatch = useDispatch();

  useEffect(async () => {
    try {
      const result = await quanLyRapService.layThongTinHeThongRap();
      setState({
        ...state,
        heThongRapChieu: result.data.content,
      });
      console.log("Showtime success", result);
    } catch (error) {
      console.log(error.response?.data);
    }
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maPhim: props.match.params.id,
      ngayChieuGioChieu: "",
      maRap: "",
      giaVe: 75000,
    },
    onSubmit: async (values) => {
      try {
        const result = await quanLyRapService.taoLichChieu(values);
        if (result.status === 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Tạo lịch chiếu thành công",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        console.log("Tạo lịch chiếu", result);
      } catch (error) {
        console.log(error.response?.data);
      }
    },
  });

  const handleChangeHeThongRap = async (value) => {
    try {
      const result = await quanLyRapService.layThongTinCumRap(value);
      setState({
        ...state,
        cumRapChieu: result.data.content,
      });
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const convertHeThongRap = () => {
    return state.heThongRapChieu?.map((heThong) => {
      return {
        key: heThong.maHeThongRap,
        label: heThong.tenHeThongRap,
        value: heThong.maHeThongRap,
      };
    });
  };

  const convertCumRapChieu = () => {
    return state.cumRapChieu?.map((cumRap) => {
      return {
        key: cumRap.maCumRap,
        label: cumRap.tenCumRap,
        value: cumRap.maCumRap,
      };
    });
  };

  const handleChangeCumRap = (value) => {
    console.log("Cụm rạp", value);
    formik.setFieldValue("maRap", value);
  };

  const onChangeDate = (values) => {
    formik.setFieldValue(
      "ngayChieuGioChieu",
      moment(values).format("DD/MM/YYYY hh:mm:ss")
    );
  };

  const onOk = (values) => {
    formik.setFieldValue(
      "ngayChieuGioChieu",
      moment(values).format("DD/MM/YYYY hh:mm:ss")
    );
    console.log({ values });
  };

  const onChangeInputNumber = (value) => {
    formik.setFieldValue("giaVe", value);
    console.log({ value });
  };

  // lấy thông tin phim từ LocalStorage
  let film = [];
  if (localStorage.getItem("filmParams")) {
    film = JSON.parse(localStorage.getItem("filmParams"));
  }

  return (
    <div className="flex justify-between px-44 py-5">
      <div className="text-center text-xl font-bold my-3 px-10 w-1/2 animate__animated animate__fadeInLeft">
        <div className="">
          <span className="font-thin">{film.tenPhim}</span>
        </div>
        <div className="flex justify-center my-3">
          <img
            className="w-52 rounded shadow-lg"
            src={film.hinhAnh}
            alt={film.maPhim}
          />
        </div>
      </div>
      <div className="w-1/2 h-fit rounded shadow-lg animate__animated animate__fadeInRight">
        <Form
          onSubmitCapture={formik.handleSubmit}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
        >
          <div className="p-5 h-96">
            <div className="text-center text-xl font-bold my-3">
              Tạo lịch chiếu
            </div>
            <Form.Item label="Hệ thống rạp">
              <Select
                options={convertHeThongRap()}
                onChange={handleChangeHeThongRap}
                placeholder="Chọn hệ thống rạp"
              />
            </Form.Item>
            <Form.Item label="Cụm rạp">
              <Select
                options={convertCumRapChieu()}
                onChange={handleChangeCumRap}
                placeholder="Chọn Cụm rạp"
              />
            </Form.Item>
            <Form.Item label="Ngày chiếu">
              <Space direction="vertical" size={12}>
                <DatePicker
                  showTime
                  format={"DD/MM/YYYY hh:mm:ss"}
                  onChange={onChangeDate}
                  onOk={onOk}
                />
              </Space>
            </Form.Item>

            <Form.Item label="Giá vé">
              <InputNumber
                addonAfter="VNĐ"
                min={75000}
                max={150000}
                defaultValue={75000}
                onChange={onChangeInputNumber}
              />
            </Form.Item>
          </div>

          <Button className="w-full" htmlType="submit" type="primary">
            Tạo lịch
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Showtime;
