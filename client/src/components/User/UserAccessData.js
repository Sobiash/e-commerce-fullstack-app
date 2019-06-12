import React, { Component } from "react";
import Userlayout from "../Hoc/UserLayout";
import ChangeEmail from "./ChangeEmail";
import ChangePassword from "./ChangePassword";

export class UserAccessData extends Component {
  render() {
    return (
      <Userlayout>
        <div className="user_product_block_wrapper">
          <ChangeEmail />
          <br />
          <hr />

          <ChangePassword />
        </div>
      </Userlayout>
    );
  }
}

export default UserAccessData;
