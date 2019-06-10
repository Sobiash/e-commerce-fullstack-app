import React from "react";
import MyButton from "../utils/button";
import Login from "./Login";

const RegisterLogin = () => {
  return (
    <div className="page_wrapper">
      <div className="container">
        <div className="register_login_container">
          <div className="left" style={{ width: "300px" }}>
            <div style={{ width: "450px", marginLeft: "30px" }}>
              <h3>I am already a registered Fashe user</h3>
              <br />
              <p>Enter your email address and password to log in.</p>
              <br />
              <Login />
            </div>
          </div>
          <div className="right">
            <div style={{ width: "450px", marginLeft: "30px" }}>
              <h3>I want a Fashe user account</h3>
              <br />
              <p>
                If you still don't have a Fashe account, use this option to
                access the registration form.
              </p>
              <p>Provide your details to make Fashe purchases easier.</p>

              <MyButton
                type="default"
                title="Create account"
                linkTo="/register"
                addStyles={{
                  margin: "10px 0 0 0"
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegisterLogin;
