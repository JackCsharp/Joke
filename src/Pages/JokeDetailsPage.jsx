import JokeService from "../API/JokeService";
import { useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import UserService from "../API/UserService";
import CommentInput from "../Components/UI/Input/CommentInput";
import DefaultButton from "../Components/UI/Button/DefaultButton";
import classes from "./Styles/JokeDetailsPage.module.css";
import CommentService from "../API/CommentService";
import { AuthContext } from "../Context/index";
import CommentReplies from "../Components/CommentReplies/CommendReplies";
import ReplyService from "../API/ReplyService";
import Comments from "../Components/Comments/Comments";

const JokeDetailsPage = () => {
  const { id } = useParams();
  const [joke, setJoke] = useState({});

  const { userId } = useContext(AuthContext);

  async function fetchJoke() {
    const response = await JokeService.getJoke(id);
    const user = await UserService.getUser(response.userId);
    setJoke({ ...response, author: user.username });
  }

  useEffect(() => {
    fetchJoke();
  }, []);
  return (
    <div>
      <div className={classes.joke}>
        <h1>{joke.title}</h1>
        <h2>{joke.text}</h2>
        <h3>Author: {joke.author}</h3>
      </div>

      <Comments jokeId={id}></Comments>
    </div>
  );
};
export default JokeDetailsPage;
