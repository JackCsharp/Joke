import { useParams } from "react-router-dom";
import GuildService from "../API/GuildService";
import UserService from "../API/UserService";
import { useNavigate } from "react-router-dom";
import GuildMembers from "../Components/Guilds/GuildMembers";
import React, { useState, useEffect, useContext } from "react";
import classes from "./Styles/GuildDetailsPage.module.css";
import DefaultButton from "../Components/UI/Button/DefaultButton";
import { AuthContext } from "../Context/index";
import ModalCreation from "../Components/ModalWindows/ModalCreation";

const GuildDetailsPage = () => {
  const { userId } = useContext(AuthContext);
  const [guild, setGuild] = useState({});
  const { id } = useParams();
  const [visible, setVisible] = useState(false);
  async function fetchData() {
    const response = await GuildService.getGuild(id);
    setGuild(response);
    console.log(guild);
  }
  useEffect(() => {
    fetchData();
  }, []);

  async function joinGuild() {
    const response = await UserService.updateGuild(userId, id);
    fetchData();
    setVisible(true);
  }

  return (
    <div className={classes.wrapper}>
      <ModalCreation isActive={visible} setIsActive={setVisible}>
        Вы успешно вступили в гильдию {guild.name}
        <div>Обновите страницу, чтобы увидеть изменения</div>
      </ModalCreation>
      <div className={classes.header}>
        <img
          className={classes.image}
          alt="L"
          src={`/GuildAvatars/${guild.picture}`}
        />
        <h1>{guild.name}</h1>
        <h2>{guild.description}</h2>
      </div>
      <div className={classes.main}>
        <div>Список участников</div>
        <GuildMembers guildId={id}></GuildMembers>
        <DefaultButton onClick={() => joinGuild()}>
          Вступить в гильдию
        </DefaultButton>
      </div>
    </div>
  );
};
export default GuildDetailsPage;
