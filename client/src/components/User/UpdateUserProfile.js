import React from "react";
import Userlayout from "../Hoc/User";
import UpdateInfo from "./UpdateInfo";

const UpdateUserProfile = () => {
  return (
    <Userlayout>
      <h1>Profile</h1>
      <UpdateInfo />
    </Userlayout>
  );
};

export default UpdateUserProfile;
