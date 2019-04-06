import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Layout from "./components/Hoc/Layout";
import PrivateRoute from "./components/Hoc/PrivateRout";
import RegisterLogin from "./components/Register_Login/RegisterLogin";
import Register from "./components/Register_Login/Register";
import Userdashboard from "./components/User/Userdashboard";
import ManageCategories from "./components/User/Admin/ManageCategories";
// import Shop from "./components/Shop/Shop";
import AddProduct from "./components/User/Admin/AddProduct";
import ProductView from "./components/Product/ProductView";
// import UserCart from "./components/Cart/UserCart";
import UpdateUserProfile from "./components/User/UpdateUserProfile";
import ManageSite from "./components/User/Admin/ManageSite";
import NotFound from "./components/utils/NotFound";
import RequestReset from "./components/ResetPassword/index";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import jwt_decode from "jwt-decode";
import setAuthToken from "./components/utils/AuthToken";
import { setCurrentUser, logoutUser } from "./actions/auth_actions";
import { clearCurrentProfile } from "./actions/user_actions";
import store from "./store";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);

  const decoded = jwt_decode(localStorage.jwtToken);

  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());

    store.dispatch(clearCurrentProfile());

    window.location.href = "/register_login";
  }
}
const App = () => {
  return (
    <Layout>
      <Switch>
        <PrivateRoute path="/user/dashboard" exact component={Userdashboard} />
        {/* <Route path="/user/cart" exact component={UserCart} /> */}
        <PrivateRoute
          path="/user/user_profile"
          exact
          component={UpdateUserProfile}
        />
        <PrivateRoute path="/admin/add_products" exact component={AddProduct} />
        <PrivateRoute
          path="/admin/manage_categories"
          exact
          component={ManageCategories}
        />
        <Route path="/admin/site_info" exact component={ManageSite} />
        <Route path="/reset-password/:token" exact component={ResetPassword} />
        <Route path="/reset-user" exact component={RequestReset} />

        <Route path="/register" exact component={Register} />
        <Route path="/register_login" exact component={RegisterLogin} />
        <Route path="/product_detail/:id" exact component={ProductView} />
        <Route path="/" exact component={Home} />
        {/* <Route path="/shop" exact component={Shop} /> */}
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
};

export default App;
