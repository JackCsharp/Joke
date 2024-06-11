import classes from "./Comments.module.css";
import { useContext, useEffect, useState } from "react";
import CommentReplies from "../CommentReplies/CommendReplies";
import UserService from "../../API/UserService";
import JokeService from "../../API/JokeService";
import CommentService from "../../API/CommentService";
import { AuthContext } from "../../Context";
import CommentInput from "../UI/Input/CommentInput";
import DefaultButton from "../UI/Button/DefaultButton";
import CommentButton from "../UI/Button/CommentButton";
import ReplyInput from "../UI/Input/ReplyInput";
import ReplyService from "../../API/ReplyService";

const Comments = (jokeId) => {
  const { userId } = useContext(AuthContext);
  const [replyVisibility, setReplyVisibility] = useState({});
  const [userReply, setUserReply] = useState({
    text: "",
    commentId: 0,
    userId: userId,
  });
  const [userReplyVisibility, setUserReplyVisibility] = useState(false);
  const [comments, setComments] = useState([]);
  const [userComment, setUserComment] = useState({
    text: "",
    jokeId: jokeId.jokeId,
    userId: userId,
  });
  const toggleReplyVisibility = (commentId) => {
    setReplyVisibility((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
  };
  async function sendComment() {
    if (userComment.text != "") {
      console.log(userComment.text);
      await CommentService.addComment(userComment);
    }
    setUserComment({
      text: "",
      jokeId: jokeId.jokeId,
      userId: userId,
    });
    fetchComments();
  }
  async function sendReply() {
    ReplyService.addReply(userReply);
    setUserReply({ ...userReply, text: "" });
    toggleReplyVisibility(userReply.commentId);
  }
  async function fetchComments() {
    const commentData = await JokeService.getAllComments(jokeId);
    const newComments = await Promise.all(
      commentData.map(async (comment) => {
        const user = await UserService.getUser(comment.userId);
        return {
          text: comment.text,
          key: comment.commentId,
          commentId: comment.commentId,
          author: user.username,
          isRepliesVisible: false,
        };
      })
    );
    setComments(newComments);
  }
  function commentHandler(c) {
    setUserReplyVisibility(!userReplyVisibility);
    setUserReply({ text: "", commentId: c.commentId, userId: userId });
  }
  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div>
      <div className={classes.form}>
        <CommentInput
          value={userComment.text}
          onChange={(e) =>
            setUserComment({ ...userComment, text: e.target.value })
          }
          placeholder="Your comment"
        ></CommentInput>
        <DefaultButton onClick={() => sendComment()}>
          Left Comment
        </DefaultButton>
      </div>
      {comments.map((c, index) => (
        <div key={index}>
          <div className={classes.comment}>
            <div>{c.author}</div>
            <div>{c.text}</div>
            <CommentButton onClick={() => toggleReplyVisibility(c.commentId)}>
              {replyVisibility[c.commentId] ? "Hide replies" : "Show replies"}
            </CommentButton>
            <CommentButton onClick={() => commentHandler(c)}>
              Reply
            </CommentButton>

            {userReplyVisibility ? (
              <div>
                <ReplyInput
                  value={userReply.text}
                  onChange={(e) =>
                    setUserReply({ ...userReply, text: e.target.value })
                  }
                  placeholder="Your reply"
                ></ReplyInput>
                <CommentButton onClick={() => sendReply()}>
                  Left reply
                </CommentButton>
              </div>
            ) : (
              ""
            )}
          </div>

          {replyVisibility[c.commentId] && (
            <div className={classes.reply}>
              <CommentReplies commentId={c.commentId}></CommentReplies>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
export default Comments;
