import React from "react";
import Userlayout from "../Hoc/UserLayout";
import UpdateInfo from "./UpdateInfo";

const UpdateUserProfile = () => {
  return (
    <Userlayout>
      <h3>Profile</h3>
      <UpdateInfo />
    </Userlayout>
  );
};

export default UpdateUserProfile;
