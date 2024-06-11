import React from "react";
import classes from "./CommentButton.module.css";

const CommentButton = ({ children, ...props }) => {
  return (
    <button {...props} className={classes.commentButton}>
      {children}
    </button>
  );
};

export default CommentButton;
