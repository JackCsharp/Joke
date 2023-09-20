import classes from "./GuildItem.module.css";
import { useNavigate } from "react-router-dom";
const GuildItem = (props) => {
  const navigate = useNavigate();
  function itemRedirection(id) {
    navigate(`/guild/${id}`);
  }

  return (
    <div
      className={classes.item}
      onClick={() => itemRedirection(props.guild.guildId)}
    >
      {props.children}
      <img
        className={classes.image}
        alt="L"
        src={`/GuildAvatars/${props.guild.picture}`}
      />
      <div className={classes.wrapper}>
        <div className={classes.head}>{props.guild.name}</div>
        <div className={classes.description}>{props.guild.description}</div>
      </div>
    </div>
  );
};
export default GuildItem;
