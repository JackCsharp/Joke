import GuildItem from "./GuildItem";

const GuildList = (props) => {
  return (
    <div>
      {props.guilds.map((guild) => (
        <GuildItem key={guild.name} guild={guild}></GuildItem>
      ))}
    </div>
  );
};
export default GuildList;
