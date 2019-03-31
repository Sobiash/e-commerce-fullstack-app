import React from "react";
import UserLayout from "../Hoc/UserLayout";
import HistoryBlock from "./HistoryBlock";
import MyButton from "../utils/button";

const Userdashboard = () => {
  return (
    <div>User Dashboard</div>
    // <UserLayout>
    //   <div>
    //     <div className="user_nfo_panel">
    //       <h3>User information</h3>
    //       <div>
    //         <span>{user.userData.name}</span>
    //         <span>{user.userData.lastname}</span>
    //         <span>{user.userData.email}</span>
    //       </div>
    //       <MyButton
    //         type="default"
    //         title="Edit info"
    //         linkTo="/user/user_profile"
    //       />
    //     </div>
    //     {user.userData.history ? (
    //       <div className="user_nfo_panel">
    //         <h3>History Purchases</h3>
    //         <div className="user_product_block_wrapper">
    //           <HistoryBlock products={user.userData.history} />
    //         </div>
    //       </div>
    //     ) : null}
    //   </div>
    // </UserLayout>
  );
};
export default Userdashboard;
