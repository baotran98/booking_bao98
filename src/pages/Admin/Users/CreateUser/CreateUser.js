import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, Select } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
  PhoneOutlined,
  HighlightOutlined,
  MailOutlined,
  UsergroupAddOutlined,
  LockOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  layDanhSachLoaiNguoiDungAction,
  themNguoiDungAction,
} from "../../../../redux/actions/QuanLyUserAction";
const { Option } = Select;

export default function CreateUser(props) {
  const { danhSachLoaiUser } = useSelector((state) => state.QuanLyUserReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(layDanhSachLoaiNguoiDungAction());
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: "",
      maLoaiNguoiDung: danhSachLoaiUser[0]?.maLoaiNguoiDung,
      hoTen: "",
    },
    validationSchema: Yup.object({
      taiKhoan: Yup.string().required("Tài khoản không được bỏ trống !!!"),
      matKhau: Yup.string()
        .required("Mật khẩu không được bỏ trống !!!")
        .min(6, "Mật khẩu cần có ít nhất 6 kí tự")
        .max(32, "Mật khẩu không được nhiều quá 32 kí tự"),
      email: Yup.string()
        .email("Không đúng định dạng của Email")
        .required("Email không được bỏ trống !!!"),
      soDt: Yup.string()
        // .typeError("Số điện thoại chỉ được nhập số")
        .required("Số điện thoại không được bỏ trống !!!")
        .min(10, "Số điện thoại ít nhất 10 số")
        .max(11, "Số điện thoại nhiều nhất 11 số"),
      maNhom: Yup.string()
        .required("Mã nhóm không được bỏ trống !!!")
        .max(4, "Mã nhóm chỉ được 4 kí tự"),
      hoTen: Yup.string().required("Họ và tên không được bỏ trống !!!"),
    }),
    onSubmit: (values) => {
      console.log({ values });
      dispatch(themNguoiDungAction(values));
    },
  });

  return (
    <div
      className="pb-16 rounded-sm"
      style={{
        minHeight: 800,
        backgroundImage: "linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)",
      }}
    >
      <div className="flex justify-center">
        <div
          className="flex justify-center items-center xl:w-2/3 2xl:w-1/2 h-28 rounded-t-md shadow-lg  -mt-16 bg-opacity-80 animate__animated animate__fadeInDown"
          style={{
            backgroundImage:
              "linear-gradient(to top, #fdcbf1 0%, #fdcbf1 1%, #e6dee9 100%)",
          }}
        >
          <div className="text-2xl font-bold text-white ">Thêm Người Dùng</div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="xl:w-2/3 2xl:w-1/2 pb-10 bg-gray-100 bg-opacity-50  rounded-b-md shadow-lg animate__animated animate__fadeIn">
          <Form layout="vertical" onSubmitCapture={formik.handleSubmit}>
            <div className="flex justify-center items-center mt-5">
              <div className="xl:mx-3 2xl:mx-5">
                <Form.Item label="Tài khoản">
                  <Input
                    className="shadow-lg"
                    style={{ borderRadius: "1rem" }}
                    size="large"
                    placeholder="Nhập tài khoản...."
                    prefix={<UserOutlined className="mr-2" />}
                    name="taiKhoan"
                    onChange={formik.handleChange}
                    value={formik.values.taiKhoan}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.taiKhoan && formik.errors.taiKhoan ? (
                    <div className="text-red-500 font-light my-1">
                      {formik.errors.taiKhoan}
                    </div>
                  ) : null}
                </Form.Item>
                <Form.Item label="Mật khẩu">
                  <Input.Password
                    className="shadow-lg"
                    style={{ borderRadius: "1rem" }}
                    size="large"
                    placeholder="Nhập mật khẩu"
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                    prefix={<LockOutlined className="mr-2" />}
                    name="matKhau"
                    onChange={formik.handleChange}
                    value={formik.values.matKhau}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.matKhau && formik.errors.matKhau ? (
                    <div className="text-red-500 font-light my-1">
                      {formik.errors.matKhau}
                    </div>
                  ) : null}
                </Form.Item>
                <Form.Item label="Số điện thoại">
                  <Input
                    className="shadow-lg"
                    style={{ borderRadius: "1rem" }}
                    type="number"
                    size="large"
                    placeholder="Nhập số điện thoại...."
                    prefix={<PhoneOutlined className="mr-2" />}
                    name="soDt"
                    onChange={formik.handleChange}
                    value={formik.values.soDt}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.soDt && formik.errors.soDt ? (
                    <div className="text-red-500 font-light my-1">
                      {formik.errors.soDt}
                    </div>
                  ) : null}
                </Form.Item>
              </div>
              <div>
                <Form.Item label="Họ tên">
                  <Input
                    className="shadow-lg"
                    style={{ borderRadius: "1rem" }}
                    size="large"
                    placeholder="Nhập họ và tên...."
                    prefix={<HighlightOutlined className="mr-2" />}
                    name="hoTen"
                    onChange={formik.handleChange}
                    value={formik.values.hoTen}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.hoTen && formik.errors.hoTen ? (
                    <div className="text-red-500 font-light my-1">
                      {formik.errors.hoTen}
                    </div>
                  ) : null}
                </Form.Item>
                <Form.Item label="Email">
                  <Input
                    className="shadow-lg"
                    style={{ borderRadius: "1rem" }}
                    size="large"
                    placeholder="Nhập email...."
                    prefix={<MailOutlined className="mr-2" />}
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-500 font-light my-1">
                      {formik.errors.email}
                    </div>
                  ) : null}
                </Form.Item>
                <Form.Item label="Mã nhóm (GP + 2 số)">
                  <Input
                    className="shadow-lg"
                    style={{
                      borderRadius: "1rem",
                    }}
                    size="large"
                    placeholder="Nhập mã nhóm...."
                    prefix={<UsergroupAddOutlined className="mr-2" />}
                    name="maNhom"
                    onChange={formik.handleChange}
                    value={formik.values.maNhom}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.maNhom && formik.errors.maNhom ? (
                    <div className="text-red-500 font-light my-1">
                      {formik.errors.maNhom}
                    </div>
                  ) : null}
                </Form.Item>
              </div>
            </div>
            <div className="flex justify-center pl-5">
              <Form.Item label="Loại người dùng">
                <Select
                  defaultValue="Khách hàng"
                  size="large"
                  className="shadow-lg"
                  style={{
                    width: "27.2rem",
                    borderRadius: "1rem",
                  }}
                  suffixIcon={<UserSwitchOutlined />}
                  name="maLoaiNguoiDung"
                  onChange={(value) => {
                    formik.setFieldValue("maLoaiNguoiDung", value);
                  }}
                >
                  {danhSachLoaiUser.map((typeUser) => {
                    return (
                      <Fragment key={typeUser.maLoaiNguoiDung}>
                        <Option value={typeUser.maLoaiNguoiDung}>
                          {typeUser.tenLoai}
                        </Option>
                      </Fragment>
                    );
                  })}
                </Select>
              </Form.Item>
            </div>
            <div className="flex justify-center mx-24 pl-5 my-3 ">
              <button
                className="w-full text-white font-bold text-md py-3 rounded transition duration-500 hover:opacity-100 hover:shadow-lg border-gray-50 border"
                type="submit"
                style={{
                  backgroundImage:
                    "linear-gradient(to top, #fdcbf1 0%, #fdcbf1 1%, #e6dee9 100%)",
                }}
              >
                Xác nhận
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
