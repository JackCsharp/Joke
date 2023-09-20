import UserService from "../../../API/UserService";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Context";
import PostList from "../../../Components/Posts/PostList";
import JokeService from "../../../API/JokeService";
import DefaultButton from "../../../Components/UI/Button/DefaultButton";

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
      <PostList posts={jokes}></PostList>
    </div>
  );
};
export default AllJokesTab;
