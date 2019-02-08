import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Layout from "./components/Hoc/Layout";
import Auth from "./components/Hoc/Auth";
import RegisterLogin from "./components/Register_Login/RegisterLogin";
import Register from "./components/Register_Login/Register";
import Userdashboard from "./components/User/Userdashboard";
import Shop from "./components/Shop/Shop";
import AddProduct from "./components/User/Admin/AddProduct";
import ManageCategories from "./components/User/Admin/ManageCategories";
import ProductView from "./components/Product/ProductView";

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route
          path="/user/dashboard"
          exact
          component={Auth(Userdashboard, true)}
        />
        <Route
          path="/admin/add_products"
          exact
          component={Auth(AddProduct, true)}
        />
        <Route
          path="/admin/manage_categories"
          exact
          component={Auth(ManageCategories, true)}
        />
        <Route path="/register" exact component={Auth(Register, false)} />
        <Route
          path="/register_login"
          exact
          component={Auth(RegisterLogin, false)}
        />
        <Route
          path="/product_detail/:id"
          exact
          component={Auth(ProductView, null)}
        />
        <Route path="/" exact component={Auth(Home, null)} />
        <Route path="/shop" exact component={Auth(Shop, null)} />
      </Switch>
    </Layout>
  );
};

export default App;
