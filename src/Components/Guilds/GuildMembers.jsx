import GuildService from "../../API/GuildService";
import classes from "./GuildMembers.module.css";
import React, { useEffect, useState } from "react";
const GuildMembers = ({ guildId, update }) => {
  const [users, setUsers] = useState([]);

  async function fetchMembers() {
    const response = await GuildService.getAllMembers(guildId);
    response.map(() => setUsers(response));
  }
  useEffect(() => {
    fetchMembers();
  }, []);
  return (
    <div className={classes.wrapper}>
      {users.map((member) => (
        <div key={member.userId}>{member.username}</div>
      ))}
    </div>
  );
};
export default GuildMembers;
