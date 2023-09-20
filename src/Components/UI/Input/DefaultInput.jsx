import React from "react";
import classes from "./DefaultInput.module.css";

const DefaultInput = ({ ...props }) => {
  return <input {...props} className={classes.defaultInput} />;
};

export default DefaultInput;
