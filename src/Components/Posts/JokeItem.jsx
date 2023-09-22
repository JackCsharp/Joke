import React from "react";
import classes from "./JokeItem.module.css";
import DefaultButton from "../UI/Button/DefaultButton";
import { useNavigate } from "react-router-dom";
const JokeItem = (props) => {
  const navigate = useNavigate();
  function itemRedirection(id) {
    navigate(`/joke/${id}`);
  }

  return (
    <div className={classes.postItem}>
      <strong>{props.post.title}</strong>
      <div>{props.post.text}</div>
      <DefaultButton onClick={() => itemRedirection(props.post.id)}>
        Открыть
      </DefaultButton>
      {props.children}
    </div>
  );
};

export default JokeItem;
