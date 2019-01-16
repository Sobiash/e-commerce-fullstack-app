import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Layout from "./components/Hoc/Layout";
import Auth from "./components/Hoc/Auth";
import RegisterLogin from "./components/Register_Login/RegisterLogin";
import Register from "./components/Register_Login/Register";
import Userdashboard from "./components/User/Userdashboard";
import Shop from "./components/Shop/Shop";

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route
          path="/user/dashboard"
          exact
          component={Auth(Userdashboard, true)}
        />
        <Route path="/register" exact component={Auth(Register, false)} />
        <Route
          path="/register_login"
          exact
          component={Auth(RegisterLogin, false)}
        />
        <Route path="/" exact component={Auth(Home, null)} />
        <Route path="/shop" exact component={Auth(Shop, null)} />
      </Switch>
    </Layout>
  );
};

export default App;
