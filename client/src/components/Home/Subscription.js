import React from "react";

const Subscription = () => {
  return (
    <div style={{ height: "200px", fontSize: "25px", textAlign: "center" }}>
      SIGN UP FOR OUR NEWSLETTER
      <input
        style={{ borderColor: "blue" }}
        className="input"
        placeholder="Enter your email"
        type="text"
      />
    </div>
  );
};

export default Subscription;
