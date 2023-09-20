import GuildService from "../API/GuildService";
import { useEffect, useState } from "react";
import GuildItem from "../Components/Guilds/GuildItem";
import classes from "./Styles/GuildPage.module.css";
import GuildList from "../Components/Guilds/GuildList";
import GuildPageSideBox from "../Components/SideBoxes/GuildPageSideBox";
import SearchBar from "../Components/UI/Input/SearchBar";

const GuildPage = () => {
  const [guilds, setGuilds] = useState([]);
  const [sortedGuilds, setSortedGuilds] = useState([]);
  const [query, setQuery] = useState("");
  async function fetchGuilds() {
    const response = await GuildService.getAll();
    response.map(() => setGuilds(response));
    response.map(() => setSortedGuilds(response));
  }
  useEffect(() => {
    const filteredGuild = guilds.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setSortedGuilds(filteredGuild);
  }, [query]);

  useEffect(() => {
    fetchGuilds();
  }, []);

  return (
    <div className={classes.main}>
      <div className={classes.leftBar}>
        <GuildPageSideBox></GuildPageSideBox>
      </div>
      <div className={classes.rightBar}>
        <SearchBar query={query} setQuery={setQuery} />
        <GuildList guilds={sortedGuilds}></GuildList>
      </div>
    </div>
  );
};
export default GuildPage;
