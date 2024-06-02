import React, { useState } from "react";
import "./Header.css";

const Header = () => {
  const [deliveryTime, setDeliveryTime] = useState("Deliver now");

  return (
    <div className="header">
      <div className="header-contents">
        <h2>Order your favourite Food here</h2>
        <div className="header-input-group">
          <input
            type="text"
            placeholder="Enter delivery address"
            className="address-input"
          />
          <div className="dropdown">
            <button className="dropbtn">{deliveryTime}</button>
            <div className="dropdown-content">
              <a onClick={() => setDeliveryTime("Deliver now")}>Deliver now</a>
              <a onClick={() => setDeliveryTime("Schedule for later")}>
                Schedule for later
              </a>
            </div>
          </div>
        </div>
        <button>View Menu</button>
      </div>
    </div>
  );
};

export default Header;
