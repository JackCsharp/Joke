import classes from "./ReplyInput.module.css";
const ReplyInput = (props) => {
  return (
    <div>
      <input {...props} className={classes.replyInput} />
    </div>
  );
};
export default ReplyInput;
