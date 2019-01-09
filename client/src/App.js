import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Layout from "./components/Hoc/Layout";
import RegisterLogin from "./components/Register_Login/RegisterLogin";

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/register_login" exact component={RegisterLogin} />
        <Route path="/" exact component={Home} />
      </Switch>
    </Layout>
  );
};

export default App;
