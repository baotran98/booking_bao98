import "./App.css";
// import { Suspense, lazy } from "react";
import { createBrowserHistory } from "history";
import { Router, Switch } from "react-router";
import { HomeTemplate } from "./templates/Home/HomeTemplate";
import { AdminTemplate } from "./templates/Admin/AdminTemplate";
import CheckoutTemplate from "./templates/Checkout/CheckoutTemplate";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import News from "./pages/News/News";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import DetailFilm from "./pages/Details/DetailFilm";
import Checkout from "./pages/Checkout/Checkout";
import UserTemplate from "./templates/User/UserTemplate";
import Loading from "./components/Loadings/Loading";
import Profile from "./pages/Profiles/Profile";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import Film from "./pages/Admin/Films/Film";
import CreateFilm from "./pages/Admin/Films/CreateFilm/CreateFilm";
import EditFilm from "./pages/Admin/Films/EditFilm/EditFilm";
import Showtime from "./pages/Admin/Films/Showtime/Showtime";
import User from "./pages/Admin/Users/User";
import CreateUser from "./pages/Admin/Users/CreateUser/CreateUser";
import EditUser from "./pages/Admin/Users/EditUser/EditUser";
import ModalSeat from "./components/HOC/ListSeatHOC/ModalSeat";
import ModalVideo from "./components/ModalVideo/ModalVideo";

export const history = createBrowserHistory();
// Lazy load
// const CheckoutTemplate = lazy(() =>
//   import("./templates/Checkout/CheckoutTemplate")
// );

function App() {
  return (
    <Router history={history}>
      <Loading />
      <ModalSeat />
      <ModalVideo />
      <Switch>
        <HomeTemplate path="/" exact Component={Home} />
        <HomeTemplate path="/home" exact Component={Home} />
        <HomeTemplate path="/contact" exact Component={Contact} />
        <HomeTemplate path="/news" exact Component={News} />
        <HomeTemplate path="/detailfilm/:id" exact Component={DetailFilm} />
        <CheckoutTemplate path="/checkout/:id" exact Component={Checkout} />
        {/* <Suspense fallback={<h1>LOADING......</h1>}>
          <CheckoutTemplate path="/checkout/:id" exact Component={Checkout} />
        </Suspense> */}
        <UserTemplate path="/login" exact Component={Login} />
        <UserTemplate path="/register" exact Component={Register} />
        <UserTemplate path="/profile" exact Component={Profile} />
        <AdminTemplate path="/admin" exact Component={Film} />
        <AdminTemplate path="/admin/film" exact Component={Film} />
        <AdminTemplate
          path="/admin/film/createfilm"
          exact
          Component={CreateFilm}
        />
        <AdminTemplate
          path="/admin/film/editfilm/:id"
          exact
          Component={EditFilm}
        />{" "}
        <AdminTemplate
          path="/admin/film/showtime/:id"
          exact
          Component={Showtime}
        />
        <AdminTemplate path="/admin/user" exact Component={User} />
        <AdminTemplate
          path="/admin/user/createuser"
          exact
          Component={CreateUser}
        />
        <AdminTemplate
          path="/admin/user/edituser/:id"
          exact
          Component={EditUser}
        />
      </Switch>
    </Router>
  );
}

export default App;
