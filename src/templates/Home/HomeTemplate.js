import { useEffect } from "react";
import { Fragment } from "react";
import { Route } from "react-router";
import CarouselHome from "./Layout/CarouselHome/CarouselHome";
import Footer from "./Layout/Footer/Footer";
import Header from "./Layout/Header/Header";

export const HomeTemplate = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const { Component, ...restProps } = props;

  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        // propsRoute trả về các props.history, props.location, props.match...các tham số trên thanh URL
        // truyền propsRoute để truyền tham số hoặc điều hướng trang nếu ko sử dụng ko cần thêm propsRoute
        return (
          <Fragment>
            <Header {...propsRoute} />
            {/* <CarouselHome {...propsRoute} /> */}
            <Component {...propsRoute} />
            <Footer {...propsRoute} />
          </Fragment>
        );
      }}
    />
  );
};
