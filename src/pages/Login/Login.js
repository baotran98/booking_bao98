import React from "react";
import { useFormik } from "formik";
import { history } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { dangNhapAction } from "../../redux/actions/QuanLyUserAction";

export default function Login(props) {
  // lấy dữ liệu người dùng từ Reducer
  const { userLogin } = useSelector((state) => state.QuanLyUserReducer);

  const dispatch = useDispatch();
  // useFormik cho form đăng nhập
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    onSubmit: (values) => {
      dispatch(dangNhapAction(values));
    },
  });
  return (
    <>
      <div className="container py-12 px-6 h-full">
        <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
          <div className="xl:w-10/12">
            <div className="block bg-white shadow-lg rounded-lg">
              <div className="lg:flex lg:flex-wrap g-0">
                <div className="lg:w-6/12 px-4 md:px-0">
                  <div className="md:p-12 md:mx-6">
                    <div className="text-center">
                      <img
                        className="mx-auto w-48"
                        src="https://movie-booking-project.vercel.app/img/logoTixLoading.png"
                        alt="logo"
                      />
                      <h4 className="text-xl font-semibold mt-1 mb-12 pb-1">
                        Tix Tix Team
                      </h4>
                    </div>
                    <form onSubmit={formik.handleSubmit}>
                      <p className="mb-4 font-bold">
                        Làm ơn, đăng nhập tài khoản !
                      </p>
                      <div className="mb-4">
                        <input
                          name="taiKhoan"
                          onChange={formik.handleChange}
                          type="text"
                          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-red-500 focus:outline-none"
                          id="exampleFormControlInput1"
                          placeholder="Nhập vào tài khoản...."
                        />
                      </div>
                      <div className="mb-4">
                        <input
                          name="matKhau"
                          onChange={formik.handleChange}
                          type="password"
                          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-red-500 focus:outline-none"
                          id="exampleFormControlInput1"
                          placeholder="Nhập vào mật khẩu...."
                        />
                      </div>
                      <div className="text-center pt-1 mb-12 pb-1">
                        <button
                          className="inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                          type="submit"
                          data-mdb-ripple="true"
                          data-mdb-ripple-color="light"
                          style={{
                            background:
                              // "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                              // "linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)",
                              "linear-gradient(to top, #ff0844 0%, #ffb199 100%)",
                          }}
                        >
                          Đăng nhập
                        </button>
                        <a className="text-gray-500" href="#!">
                          Quên mật khẩu?
                        </a>
                      </div>
                      <div className="flex items-center justify-between pb-6">
                        <p className="mb-0 mr-2">Bạn chưa có tài khoản?</p>
                        <button
                          onClick={() => {
                            history.push("/register");
                          }}
                          type="button"
                          className="inline-block px-6 py-2 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                          data-mdb-ripple="true"
                          data-mdb-ripple-color="light"
                        >
                          Đăng ký
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div
                  className="lg:w-6/12 flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none"
                  style={{
                    backgroundImage: ` url(
                      "https://source.unsplash.com/random/?1"
                    )`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
