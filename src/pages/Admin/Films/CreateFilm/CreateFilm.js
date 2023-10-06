import React, { useState } from "react";
import { useFormik } from "formik";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
} from "antd";
import moment from "moment";
import { useDispatch } from "react-redux";
import { themPhimMoiUpLoadHinhAction } from "../../../../redux/actions/QuanLyPhimAction";
import { GROUPID } from "../../../../util/settings/config";

const CreateFilm = (props) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      maNhom: "",
      ngayKhoiChieu: "",
      sapChieu: false,
      dangChieu: false,
      hot: false,
      danhGia: 0,
      hinhAnh: {},
    },
    onSubmit: (values) => {
      values.maNhom = GROUPID;
      // tạo đối tượng formData => đưa giá trị values từ formik vào formData
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          formData.append("File", values.hinhAnh, values.hinhAnh.name);
        }
      }
      // do formData có tính bảo mật nên muốn console dữ liệu nào cần phải get với trường muốn lấy
      console.log("formData", formData.get("tenPhim"));
      // gọi API gửi các giá trị từ formData về Backend để xử lý
      dispatch(themPhimMoiUpLoadHinhAction(formData));
    },
  });

  const [imgSrc, setImgSrc] = useState(null);

  const handleChangePicker = (values) => {
    console.log({ values });
    let ngayKhoiChieu = moment(values).format("DD/MM/YYYY");
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
  const handleChangeFile = (e) => {
    // lấy file ra từ e
    let file = e.target.files[0];
    // tạo đối tượng để đọc file
    if (
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/gif" ||
      file.type === "jpg"
    ) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        console.log(e.target.result);
        setImgSrc(e.target.result); // set url hình thành base64
      };
    }
    formik.setFieldValue("hinhAnh", file);
  };

  return (
    <div className="px-44 py-5 animate__animated animate__fadeIn">
      <div className="text-center text-xl font-bold my-3 ">Thêm phim mới</div>
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
          <Input name="tenPhim" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Trailer">
          <Input name="trailer" onChange={formik.handleChange} />
        </Form.Item>{" "}
        <Form.Item label="Mô tả">
          <Input name="moTa" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Ngày khởi chiếu">
          <DatePicker format={"DD/MM/YYYY"} onChange={handleChangePicker} />
        </Form.Item>
        <Form.Item label="Đánh giá (sao)">
          <InputNumber
            onChange={handleChangeInputNumber("danhGia")}
            min={0}
            max={10}
          />
        </Form.Item>
        <Form.Item label="Đang chiếu" valuePropName="checked">
          <Switch onChange={handleChangeSwitch("dangChieu")} />
        </Form.Item>
        <Form.Item label="Sắp chiếu" valuePropName="checked">
          <Switch onChange={handleChangeSwitch("sapChieu")} />
        </Form.Item>
        <Form.Item label="HOT" valuePropName="checked">
          <Switch onChange={handleChangeSwitch("hot")} />
        </Form.Item>
        <Form.Item label="Upload hình">
          <input
            type="file"
            onChange={handleChangeFile}
            accept="image/jpeg,image/png,image/gif,jpg"
          />
          <br />
          <img className="w-32 rounded shadow-md" src={imgSrc} alt="" />
        </Form.Item>
        <div className="flex justify-center">
          <Button className="w-40" htmlType="submit" type="primary">
            Thêm phim
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CreateFilm;
