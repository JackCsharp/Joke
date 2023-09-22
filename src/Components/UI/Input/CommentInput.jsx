import classes from "./CommentInput.module.css";
const CommentInput = (props) => {
  return (
    <div>
      <input {...props} className={classes.commentInput} />
    </div>
  );
};
export default CommentInput;
