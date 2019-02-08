import React from "react";
import UserLayout from "../../Hoc/User";
import ManageDresses from "./ManageDresses";
import ManageColors from "./ManageColors";

const ManageCategories = () => {
  return (
    <UserLayout>
      <ManageDresses />
      <ManageColors />
    </UserLayout>
  );
};

export default ManageCategories;
