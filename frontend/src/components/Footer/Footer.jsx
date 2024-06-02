import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo1} alt="" />
          <p>
            Introducing blackEats, your ultimate food delivery app! blackEats
            brings a wide variety of delicious cuisines right to your doorstep.
            Whether you're craving local favorites or international delicacies,
            our easy-to-use platform ensures a seamless and enjoyable ordering
            experience. Satisfy your hunger with blackEats today – your taste
            buds will thank you!
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+1-212-456-7890</li>
            <li>contact@blackEats.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2024 © blackEats.com - All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
