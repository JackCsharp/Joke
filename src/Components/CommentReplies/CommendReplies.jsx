import { useEffect, useState } from "react";
import classes from "./CommentReplies.module.css";
import ReplyService from "../../API/ReplyService";
import UserService from "../../API/UserService";
const CommentReplies = ({ commentId }) => {
  const [replies, setReplies] = useState([]);

  async function fetchReplies() {
    const response = await ReplyService.getRepliesByComment(commentId);
    const newReplies = await Promise.all(
      response.map(async (reply) => {
        const user = await UserService.getUser(reply.userId);
        return {
          text: reply.text,
          key: reply.commentId,
          commentReplyId: reply.commentReplyId,
          author: user.username,
        };
      })
    );
    setReplies(newReplies);
  }

  useEffect(() => {
    fetchReplies();
  }, []);
  return (
    <div>
      {replies.map((reply) => (
        <div className={classes.reply} key={reply.commentReplyId}>
          <div className={classes.author}>{reply.author}</div>
          <div className={classes.text}>{reply.text}</div>
        </div>
      ))}
    </div>
  );
};
export default CommentReplies;
