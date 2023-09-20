import classes from "./GuildPageSideBox.module.css";
import WhiteButton from "../UI/Button/WhiteButton";
import DefaultButton from "../UI/Button/DefaultButton";
import ModalCreation from "../ModalWindows/ModalCreation";
import { useContext, useEffect, useState } from "react";
import PostGuild from "../UI/PostForm/PostGuild";
import UserService from "../../API/UserService";
import { AuthContext } from "../../Context";
import { useNavigate } from "react-router-dom";

const GuildPageSideBox = (props) => {
  const [visible, setVisible] = useState(false);
  const { userId } = useContext(AuthContext);
  const [guildId, setGuildId] = useState({});
  const navigate = useNavigate();
  function itemRedirection(id) {
    navigate(`/guild/${id}`);
  }
  async function getGuild() {
    const response = await UserService.getUser(userId);
    setGuildId(response.data[0].guildId);
  }
  useEffect(() => {
    getGuild();
  }, []);
  return (
    <div className={classes.wrapper}>
      <ModalCreation isActive={visible} setIsActive={setVisible}>
        <PostGuild></PostGuild>
      </ModalCreation>
      <WhiteButton onClick={() => setVisible(true)}>
        Создать гильдию
      </WhiteButton>

      <DefaultButton onClick={() => itemRedirection(guildId)}>
        Моя гильдия
      </DefaultButton>
    </div>
  );
};
export default GuildPageSideBox;
