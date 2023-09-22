import JokeService from "../API/JokeService";
import { useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import UserService from "../API/UserService";
import CommentInput from "../Components/UI/Input/CommentInput";
import DefaultButton from "../Components/UI/Button/DefaultButton";
import classes from "./Styles/JokeDetailsPage.module.css";
import CommentService from "../API/CommentService";
import { AuthContext } from "../Context/index";

const JokeDetailsPage = () => {
  const { id } = useParams();
  const [joke, setJoke] = useState({});
  const [comments, setComments] = useState([]);
  const { userId } = useContext(AuthContext);
  const [userComment, setUserComment] = useState({
    text: "",
    jokeId: id,
    userId: userId,
  });

  async function sendComment() {
    await CommentService.addComment(userComment);
    setUserComment({
      text: "",
      jokeId: id,
      userId: userId,
    });
    fetchComments();
  }

  async function fetchJoke() {
    const response = await JokeService.getJoke(id);
    setJoke(response);
    const user = await UserService.getUser(response.userId);
    setJoke({ ...response, author: user.username });
  }
  async function fetchComments() {
    const commentData = await JokeService.getAllComments(id);
    const newComments = await Promise.all(
      commentData.map(async (comment) => {
        const user = await UserService.getUser(comment.userId);
        return {
          text: comment.text,
          key: comment.commentId,
          author: user.username,
        };
      })
    );
    setComments(newComments);
  }
  useEffect(() => {
    fetchJoke();
    fetchComments();
  }, []);
  return (
    <div>
      <div className={classes.joke}>
        <h1>{joke.title}</h1>
        <h2>{joke.text}</h2>
        <h3>Автор: {joke.author}</h3>
      </div>

      <div className={classes.form}>
        <CommentInput
          value={userComment.text}
          onChange={(e) =>
            setUserComment({ ...userComment, text: e.target.value })
          }
          placeholder="Ваш комментарий"
        ></CommentInput>
        <DefaultButton onClick={() => sendComment()}>
          Опубликовать
        </DefaultButton>
      </div>
      {comments.map((c, index) => (
        <div className={classes.comment} key={index}>
          <div>{c.author}</div>
          <div>{c.text}</div>
        </div>
      ))}
    </div>
  );
};
export default JokeDetailsPage;
