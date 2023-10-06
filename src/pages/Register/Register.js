import React from "react";
import { useDispatch } from "react-redux";
import style from "./css/register.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { dangKyAction } from "../../redux/actions/QuanLyUserAction";

export default function Register(props) {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: "GP00",
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
        .required("Số điện thoại không được bỏ trống !!!")
        .min(10, "Số điện thoại ít nhất 10 số")
        .max(11, "Số điện thoại nhiều nhất 11 số"),
      hoTen: Yup.string().required("Họ và tên không được bỏ trống !!!"),
    }),
    onSubmit: (values) => {
      console.log({ values });
      dispatch(dangKyAction(values));
    },
  });

  return (
    <div className="animate__animated animate__fadeIn">
      <div
        className="w-screen h-screen md:-mx-4 "
        style={{
          filter: "blur(5px)",
          backgroundImage:
            "url('https://source.unsplash.com/random/500x500/?1'",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100%",
          backgroundPosition: "center",
        }}
      ></div>
      <form className={`${style.Form} mt-5`} onSubmit={formik.handleSubmit}>
        <div className="flex justify-center -mt-20">
          <img
            className="border-2 w-20 h-20 rounded-full shadow-md"
            src="https://source.unsplash.com/random/500x500/?1"
            alt="logo"
          />
        </div>
        <h3 className="text-center text-gray-50 text-xl">Đăng ký tại đây</h3>

        <label className={`${style.Label}`}>Họ tên</label>
        <input
          name="hoTen"
          className={`${style.Input} focus:border-2 focus:border-gray-50 focus:border-solid placeholder:italic placeholder:text-slate-400 focus:text-gray-900 shadow-lg focus:transition focus:duration-1000`}
          type="text"
          placeholder="nhập họ và tên....."
          id="fullname"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.hoTen}
        />
        {formik.touched.hoTen && formik.errors.hoTen ? (
          <div className="text-red-500 font-light my-1">
            {formik.errors.hoTen}
          </div>
        ) : null}

        <label className={`${style.Label}`}>Tài khoản</label>
        <input
          name="taiKhoan"
          className={`${style.Input} focus:border-2 focus:border-gray-50 focus:border-solid placeholder:italic placeholder:text-slate-400 focus:text-gray-900 shadow-lg focus:transition focus:duration-1000`}
          type="text"
          placeholder="nhập tài khoản...."
          id="username"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.taiKhoan}
        />
        {formik.touched.taiKhoan && formik.errors.taiKhoan ? (
          <div className="text-red-500 font-light my-1">
            {formik.errors.taiKhoan}
          </div>
        ) : null}

        <label className={`${style.Label}`}>Mật khẩu</label>
        <input
          name="matKhau"
          className={`${style.Input} focus:border-2 focus:border-gray-50 focus:border-solid placeholder:italic placeholder:text-slate-400 focus:text-gray-900 shadow-lg focus:transition focus:duration-1000`}
          type="password"
          placeholder="nhập mật khẩu...."
          id="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.matKhau}
        />
        {formik.touched.matKhau && formik.errors.matKhau ? (
          <div className="text-red-500 font-light my-1">
            {formik.errors.matKhau}
          </div>
        ) : null}

        <label className={`${style.Label}`}>Email</label>
        <input
          name="email"
          className={`${style.Input} focus:border-2 focus:border-gray-50 focus:border-solid placeholder:italic placeholder:text-slate-400 focus:text-gray-900 shadow-lg focus:transition focus:duration-1000`}
          type="email"
          placeholder="nhập email...."
          id="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-500 font-light my-1">
            {formik.errors.email}
          </div>
        ) : null}

        <label className={`${style.Label}`}>Số điện thoại</label>
        <input
          name="soDt"
          className={`${style.Input} focus:border-2 focus:border-gray-50 focus:border-solid placeholder:italic placeholder:text-slate-400 focus:text-gray-900 shadow-lg focus:transition focus:duration-1000`}
          type="text"
          placeholder="nhập số điện thoại..."
          id="phonenumber"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.soDt}
        />
        {formik.touched.soDt && formik.errors.soDt ? (
          <div className="text-red-500 font-light my-1">
            {formik.errors.soDt}
          </div>
        ) : null}

        <label hidden className={`${style.Label}`}>
          Mã nhóm
        </label>
        <input
          name="maNhom"
          className={`${style.Input} focus:border-2 focus:border-gray-50 focus:border-solid placeholder:italic placeholder:text-slate-400 focus:text-gray-900 shadow-lg focus:transition focus:duration-1000`}
          type="text"
          placeholder="nhập mã nhóm...."
          id="idgroup"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.maNhom}
          hidden
          disabled
        />
        {formik.touched.maNhom && formik.errors.maNhom ? (
          <div className="text-red-500 font-light my-1">
            {formik.errors.maNhom}
          </div>
        ) : null}

        <button
          className={`${style.Button} mt-3 hover:shadow-xl transition ease-in-out hover:scale-105 duration-300 `}
          type="submit"
        >
          Xác nhận
        </button>
      </form>
    </div>
  );
}
