import { useParams } from "react-router-dom";
import GuildService from "../API/GuildService";
import UserService from "../API/UserService";
import { useNavigate } from "react-router-dom";
import GuildMembers from "../Components/Guilds/GuildMembers";
import React, { useState, useEffect, useContext, useRef } from "react";
import classes from "./Styles/GuildDetailsPage.module.css";
import DefaultButton from "../Components/UI/Button/DefaultButton";
import { AuthContext } from "../Context/index";
import ModalCreation from "../Components/ModalWindows/ModalCreation";
import JokeList from "../Components/Jokes/JokeList";
import JokeService from "../API/JokeService";
import DefaultInput from "../Components/UI/Input/DefaultInput";

const GuildDetailsPage = () => {
  const { userId } = useContext(AuthContext);
  const { id } = useParams();
  const [guild, setGuild] = useState({ guildId: id });
  const [users, setUsers] = useState([]);
  const [jokes, setJokes] = useState([]);
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState({
    userId: userId,
    text: "",
    guildId: id,
  });
  const endOfChatRef = useRef(null);

  async function fetchData() {
    const resp = await JokeService.getJokesByGuild(guild.guildId);
    resp.data.map((item) => {
      setJokes(resp.data);
    });
    const response = await GuildService.getGuild(id);
    setGuild(response);
  }
  async function fetchMessages() {
    const messages = await GuildService.getMessagesByGuild(guild.guildId);
    messages.data.map(() => {
      setMessages(messages.data);
    });
  }
  async function fetchUsers() {
    const users = await UserService.getAllUsers();

    users.data.map(() => {
      setUsers(users.data);
    });
  }
  useEffect(() => {
    fetchMessages();
    fetchData();
    fetchUsers();
  }, [messages]);

  useEffect(() => {
    if (endOfChatRef.current) {
      endOfChatRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [messages]);

  async function joinGuild() {
    const response = await UserService.updateGuild(userId, id);
    fetchData();
    setVisible(true);
  }
  async function addMessage() {
    GuildService.addMessage(message);
    setMessage({ userId: userId, text: "", guildId: id });
    fetchMessages();
    fetchData();
  }

  return (
    <div className={classes.wrapper}>
      <ModalCreation isActive={visible} setIsActive={setVisible}>
        <div>You joined guild {guild.name}</div>
        <div>Please refresh page to see changes</div>
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
        <div>Members</div>
        <GuildMembers guildId={id}></GuildMembers>
        <DefaultButton onClick={() => joinGuild()}>Join now</DefaultButton>
      </div>
      <div>
        {users.find((u) => u.userId === userId)?.guildId === guild.guildId ? (
          <div>
            <div id="chat" className={classes.chat}>
              <div className={classes.chatHeader}>Chat</div>
              {messages.map((m) => {
                const user = users.find((u) => u.userId === m.userId);
                return (
                  <div
                    className={classes.chatMessage}
                    key={m.guildChatMessageId}
                  >
                    <div>{user ? user.username : "Unknown Author"}</div>
                    <div>{m.text}</div>
                  </div>
                );
              })}
              <div className={classes.inputBar}>
                <div>
                  <DefaultInput
                    value={message.text}
                    onChange={(e) =>
                      setMessage({ ...message, text: e.target.value })
                    }
                    placeholder="Message"
                  ></DefaultInput>
                </div>
                <div>
                  <DefaultButton onClick={() => addMessage()}>
                    Send
                  </DefaultButton>
                </div>
              </div>
              <div ref={endOfChatRef}></div>
            </div>
            <div className={classes.guildJokes}>
              <strong className={classes.guildJokesTitle}>
                Guild member's jokes
              </strong>
              <JokeList posts={jokes} />
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};
export default GuildDetailsPage;
