import React from "react";
import classes from "./WhiteButton.module.css";

const WhiteButton = ({ children, ...props }) => {
  return (
    <button {...props} className={classes.whiteButton}>
      {children}
    </button>
  );
};

export default WhiteButton;
