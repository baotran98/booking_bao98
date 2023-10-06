import { Fragment } from "react";
import { Route } from "react-router";

const UserTemplate = (props) => {
  const { Component, ...restProps } = props;

  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        // propsRoute trả về các props.history, props.location, props.match...các tham số trên thanh URL
        // truyền propsRoute để truyền tham số hoặc điều hướng trang nếu ko sử dụng ko cần thêm propsRoute
        return (
          <Fragment>
            <section className="h-full gradient-form bg-gray-200 md:h-screen">
              <Component {...propsRoute} />
            </section>
          </Fragment>
        );
      }}
    />
  );
};
export default UserTemplate;
