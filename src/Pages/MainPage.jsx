import "../App.css";
import DefaultButton from "../Components/UI/Button/DefaultButton";
import { useState, useEffect } from "react";
import PostList from "../Components/Posts/PostList";
import NavigationPanel from "../Components/NavigationPanel/NavigationPanel";
import ModalCreation from "../Components/ModalWindows/ModalCreation";
import PostForm from "../Components/UI/PostForm/PostForm";
import JokeService from "../API/JokeService";
import SearchBar from "../Components/UI/Input/SearchBar";
const MainPage = () => {
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
    setSortedPosts([...posts, newPost]);
    setVisible(false);
    await JokeService.addJoke(newPost);
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

          <PostList posts={sortedPosts} deletejoke={DeletePost} />
        </div>
      </div>
    </div>
  );
};
export default MainPage;
