import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { Button, DatePicker, Form, Input, InputNumber, Switch } from "antd";
import moment from "moment";
import {
  capNhatPhimUploadAction,
  layThongTinPhimAction,
} from "../../../../redux/actions/QuanLyPhimAction";
import { GROUPID } from "../../../../util/settings/config";

const EditFilm = (props) => {
  const [imgSrc, setImgSrc] = useState(null);
  const { thongTinPhim } = useSelector((state) => state.QuanLyPhimReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    let { id } = props.match.params;
    dispatch(layThongTinPhimAction(id));
  }, []);
  const formik = useFormik({
    enableReinitialize: true, // dùng để chỉnh sửa giá trị
    initialValues: {
      maPhim: thongTinPhim.maPhim,
      tenPhim: thongTinPhim.tenPhim,
      trailer: thongTinPhim.trailer,
      moTa: thongTinPhim.moTa,
      //   maNhom: "GP03",
      ngayKhoiChieu: thongTinPhim.ngayKhoiChieu,
      sapChieu: thongTinPhim.sapChieu,
      dangChieu: thongTinPhim.dangChieu,
      hot: thongTinPhim.hot,
      danhGia: thongTinPhim.danhGia,
      hinhAnh: null, // API ko nhận giá trị Null nên hình ảnh ko sửa sẽ ko bị thay đổi
    },
    onSubmit: (values) => {
      values.maNhom = GROUPID;
      // tạo đối tượng formData => đưa giá trị values từ formik vào formData
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          if (values.hinhAnh !== null) {
            formData.append("File", values.hinhAnh, values.hinhAnh.name);
          }
        }
      }
      //   console.log("Update phim", values);
      // do formData có tính bảo mật nên muốn console dữ liệu nào cần phải get với trường muốn lấy
      //   console.log("formData", formData.get("tenPhim"));
      // gọi API gửi các giá trị từ formData về Backend để xử lý
      dispatch(capNhatPhimUploadAction(formData));
    },
  });

  const handleChangePicker = (values) => {
    console.log({ values });
    let ngayKhoiChieu = moment(values);
    formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
  };
  // closure function
  const handleChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };
  const handleChangeInputNumber = (number) => {
    return (value) => {
      formik.setFieldValue(number, value);
    };
  };
  // set file hình ảnh để upload lên API
  const handleChangeFile = async (e) => {
    // lấy file ra từ e
    let file = e.target.files[0];
    if (
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/gif" ||
      file.type === "jpg"
    ) {
      // lấy dữ liệu hình ảnh lưu vào formik
      await formik.setFieldValue("hinhAnh", file); // cần đưa hình ảnh vào formik trc, tránh sự bất đồng bộ => ko thể thay đổi hình ảnh liên tục đc
      // tạo đối tượng để đọc file
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        console.log(e.target.result);
        setImgSrc(e.target.result); // set url hình thành base64
      };
    }
  };

  return (
    <div className="px-44 py-5 animate__animated animate__fadeIn">
      <div className="text-center text-xl font-bold my-3 ">Cập nhật phim</div>
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
        <Form.Item label="Tên phim">
          <Input
            name="tenPhim"
            onChange={formik.handleChange}
            value={formik.values.tenPhim}
          />
        </Form.Item>
        <Form.Item label="Trailer">
          <Input
            name="trailer"
            onChange={formik.handleChange}
            value={formik.values.trailer}
          />
        </Form.Item>{" "}
        <Form.Item label="Mô tả">
          <Input
            name="moTa"
            onChange={formik.handleChange}
            value={formik.values.moTa}
          />
        </Form.Item>
        <Form.Item label="Ngày khởi chiếu">
          <DatePicker
            format={"DD/MM/YYYY"}
            onChange={handleChangePicker}
            defaultValue={moment(formik.values.ngayKhoiChieu)}
          />
        </Form.Item>
        <Form.Item label="Đánh giá (sao)">
          <InputNumber
            value={formik.values.danhGia}
            onChange={handleChangeInputNumber("danhGia")}
            min={0}
            max={10}
          />
        </Form.Item>
        <Form.Item className="mx-10" label="Đang chiếu" valuePropName="checked">
          <Switch
            onChange={handleChangeSwitch("dangChieu")}
            checked={formik.values.dangChieu}
          />
        </Form.Item>
        <Form.Item label="Sắp chiếu" valuePropName="checked">
          <Switch
            onChange={handleChangeSwitch("sapChieu")}
            checked={formik.values.sapChieu}
          />
        </Form.Item>
        <Form.Item label="HOT" valuePropName="checked">
          <Switch
            onChange={handleChangeSwitch("hot")}
            checked={formik.values.hot}
          />
        </Form.Item>
        <Form.Item label="Upload hình">
          <input
            type="file"
            onChange={handleChangeFile}
            accept="image/jpeg,image/png,image/gif,jpg"
          />
          <br />
          <img
            className="w-32 rounded shadow-md"
            src={imgSrc === null ? thongTinPhim.hinhAnh : imgSrc}
            alt=""
          />
        </Form.Item>
        <div className="flex justify-center">
          <Button className="w-40" htmlType="submit" type="primary">
            Cập nhật phim
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default EditFilm;
