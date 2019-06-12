import React from "react";
import Userlayout from "../Hoc/UserLayout";
import UpdateInfo from "./UpdateInfo";

const UpdateUserProfile = () => {
  return (
    <Userlayout>
      <div className="user_product_block_wrapper">
        <h2>Personal details</h2>
        <br />
        <p>
          You can access and modify your personal details (name, billing
          address, telephone number, etc.) in order to facilitate your future
          purchases and to notify us of any change in your contact details.
        </p>
        <br />
        <UpdateInfo />
        <br />

        <small>
          At Fashe we take your privacy very seriously and are committed to the
          protection of your personal data. Learn more about how we care for and
          use your data in our Privacy Policy.
        </small>
      </div>
    </Userlayout>
  );
};

export default UpdateUserProfile;
