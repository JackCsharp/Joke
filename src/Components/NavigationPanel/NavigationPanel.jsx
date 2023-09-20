import React from "react";
import NavigationButton from "../UI/Button/NavigationButton";
import { BrowserRouter, Link } from "react-router-dom";

const NavigationPanel = (props) => {
  return (
    <div className="navpanel">
      <BrowserRouter></BrowserRouter>
      {props.children}
    </div>
  );
};

export default NavigationPanel;
