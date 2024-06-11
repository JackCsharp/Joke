import { useState, useContext } from "react";
import DefaultInput from "../Input/DefaultInput";
import classes from "./PostGuild.module.css";
import { guildimages } from "../../../Assets/images";
import DefaultButton from "../Button/DefaultButton";
import { AuthContext } from "../../../Context/index";
import GuildService from "../../../API/GuildService";
import UserService from "../../../API/UserService";

const PostGuild = () => {
  let response;
  const [guild, setGuild] = useState({
    name: "",
    description: "",
    picture: "",
    rating: 0,
    numberOfJokers: 1,
  });
  const { userId } = useContext(AuthContext);
  function imageClickHandler(imagePath) {
    setGuild({ ...guild, picture: imagePath });
  }
  async function Submit(e) {
    e.preventDefault();
    response = await GuildService.addGuild(guild);
    console.log(response.data);
    UserService.updateGuild(userId, response.data.guildId);
  }
  return (
    <form className={classes.wrapper}>
      <div className={classes.inputs}>
        <DefaultInput
          placeholder="Name"
          value={guild.name}
          onChange={(e) => setGuild({ ...guild, name: e.target.value })}
        />
      </div>
      <div>
        <DefaultInput
          placeholder="Description"
          value={guild.description}
          onChange={(e) => setGuild({ ...guild, description: e.target.value })}
        />
      </div>
      <div className={classes.imageContainer}>
        {guildimages.map((image) => (
          <img
            onClick={() => imageClickHandler(image.path)}
            className={classes.image}
            alt={image.name}
            src={`/GuildAvatars/${image.path}`}
            key={image.name}
          />
        ))}
      </div>
      <DefaultButton onClick={(e) => Submit(e)}>Create</DefaultButton>
    </form>
  );
};
export default PostGuild;
