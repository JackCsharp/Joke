import React from "react";
import JokeItem from "./JokeItem";
const JokeList = (props) => {
  return (
    <div>
      {props.posts.map((post) => (
        <JokeItem key={post.id} post={post} {...props}></JokeItem>
      ))}
    </div>
  );
};

export default JokeList;
