import "../App.css";
import DefaultButton from "../Components/UI/Button/DefaultButton";
import { useState, useEffect } from "react";
import JokeList from "../Components/Jokes/JokeList";
import ModalCreation from "../Components/ModalWindows/ModalCreation";
import PostForm from "../Components/UI/PostForm/PostForm";
import JokeService from "../API/JokeService";
import SearchBar from "../Components/UI/Input/SearchBar";
const JokePage = () => {
  const [isVisible, setVisible] = useState(false);
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("");
  const [sortedPosts, setSortedPosts] = useState([]);

  async function fetchPosts() {
    const response = await JokeService.getAll();
    response.data.map((item) => {
      setPosts(response.data);
    });
    response.data.map((item) => {
      setSortedPosts(response.data);
    });
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const AddNewPost = async (newPost) => {
    setVisible(false);
    await JokeService.addJoke(newPost);
    fetchPosts();
  };

  const DeletePost = async (id) => {
    await JokeService.deleteJoke(id);
    setSortedPosts([...sortedPosts]);
  };

  useEffect(() => {
    const filteredPosts = posts.filter((item) => item.title.includes(query));
    setSortedPosts(filteredPosts);
  }, [query]);

  return (
    <div className="App">
      <ModalCreation isActive={isVisible} setIsActive={setVisible}>
        <PostForm Create={AddNewPost}></PostForm>
      </ModalCreation>

      <div className="main">
        <div className="navbar">
          <DefaultButton onClick={() => setVisible(true)}>
            Create joke
          </DefaultButton>
        </div>
        <div className="text">
          <SearchBar query={query} setQuery={setQuery} />

          <JokeList posts={sortedPosts} deletejoke={DeletePost} />
        </div>
      </div>
    </div>
  );
};
export default JokePage;
