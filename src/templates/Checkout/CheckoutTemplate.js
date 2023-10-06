import { Fragment } from "react";
import { Route, Redirect } from "react-router";
import { USER_LOGIN } from "../../util/settings/config";

const CheckoutTemplate = (props) => {
  const { Component, ...restProps } = props;

  if (!localStorage.getItem(USER_LOGIN)) {
    return <Redirect to="/login" />;
  }

  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        // propsRoute trả về các props.history, props.location, props.match...các tham số trên thanh URL
        // truyền propsRoute để truyền tham số hoặc điều hướng trang nếu ko sử dụng ko cần thêm propsRoute
        return (
          <Fragment>
            <Component {...propsRoute} />
          </Fragment>
        );
      }}
    />
  );
};
export default CheckoutTemplate;
