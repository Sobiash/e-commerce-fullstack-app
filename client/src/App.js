import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home/Home";
import Layout from "./Hoc/Layout";

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </Layout>
  );
};

export default App;
