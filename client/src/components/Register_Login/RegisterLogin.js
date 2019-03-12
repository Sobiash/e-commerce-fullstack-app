import React from "react";
import MyButton from "../utils/button";
import Login from "./Login";

const RegisterLogin = () => {
  return (
    <div className="page_wrapper">
      <div className="container">
        <div className="register_login_container">
          <div className="left">
            <h3>New Customer</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt
              non facilis perferendis, optio rerum cum dolorem in nemo atque
              accusantium sapiente obcaecati consequatur totam quaerat officiis
              quisquam cumque laboriosam perspiciatis!
            </p>
            <MyButton
              type="default"
              title="Create an account"
              linkTo="/register"
              addStyles={{
                margin: "10px 0 0 0"
              }}
            />
          </div>
          <div className="right">
            <h3>Returning Customers</h3>
            <p>If you have an account, please login.</p>
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegisterLogin;
