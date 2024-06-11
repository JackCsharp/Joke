import React from "react";
import classes from "./JokeItem.module.css";
import DefaultButton from "../UI/Button/DefaultButton";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context";
import JokeService from "../../API/JokeService";

const JokeItem = (props) => {
  const { userId } = useContext(AuthContext);
  const adminIn = 9;
  const navigate = useNavigate();
  function itemRedirection(id) {
    navigate(`/joke/${id}`);
  }
  function deleteJoke(id) {
    JokeService.deleteJoke(id);
  }
  function reportJoke(id) {
    JokeService.reportJoke(id);
  }
  return (
    <div className={classes.postItem}>
      {userId === adminIn ? (
        <div>
          {props.post.title.includes("%red") ? (
            <strong className={classes.redTitle}>
              {props.post.title.replace("%red", "")}
            </strong>
          ) : (
            <strong>{props.post.title}</strong>
          )}
        </div>
      ) : (
        <strong>
          {props.post.title.includes("%red") ? (
            <strong>{props.post.title.replace("%red", "")}</strong>
          ) : (
            <strong>{props.post.title}</strong>
          )}
        </strong>
      )}

      <div>{props.post.text}</div>
      <DefaultButton onClick={() => itemRedirection(props.post.id)}>
        Open
      </DefaultButton>
      <DefaultButton onClick={() => reportJoke(props.post.id)}>
        Report
      </DefaultButton>
      {userId === adminIn ? (
        <DefaultButton onClick={() => deleteJoke(props.post.id)}>
          Delete
        </DefaultButton>
      ) : (
        <div></div>
      )}
      {props.children}
    </div>
  );
};

export default JokeItem;
