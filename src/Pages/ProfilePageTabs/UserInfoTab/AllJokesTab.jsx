import UserService from "../../../API/UserService";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Context";
import JokeList from "../../../Components/Posts/JokeList";

const AllJokesTab = () => {
  const [jokes, setJokes] = useState([]);
  const { userId } = useContext(AuthContext);
  async function fetchJokes() {
    const data = await UserService.getJokes(userId);
    setJokes(data.data);
  }
  useEffect(() => {
    fetchJokes();
  }, []);

  return (
    <div>
      Свои шутки
      <JokeList posts={jokes}></JokeList>
    </div>
  );
};
export default AllJokesTab;
