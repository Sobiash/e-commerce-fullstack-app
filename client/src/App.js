import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Layout from "./components/Hoc/Layout";
import RegisterLogin from "./components/Register_Login/RegisterLogin";
import Register from "./components/Register_Login/Register";
import Userdashboard from "./components/User";

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/user/dashboard" exact component={Userdashboard} />
        <Route path="/register" exact component={Register} />
        <Route path="/register_login" exact component={RegisterLogin} />
        <Route path="/" exact component={Home} />
      </Switch>
    </Layout>
  );
};

export default App;
