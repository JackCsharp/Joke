import JokeService from "../API/JokeService";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
const JokePage = () => {
  const { id } = useParams();
  const [joke, setJoke] = useState({});
  async function fetchJoke() {
    const response = await JokeService.getJoke(id);
    setJoke(response);
  }
  useEffect(() => {
    fetchJoke();
  }, []);
  return (
    <div>
      <h1>{joke.title}</h1>
      <h2>{joke.text}</h2>
    </div>
  );
};
export default JokePage;
