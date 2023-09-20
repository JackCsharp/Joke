import React from "react";
import PostItem from "./PostItem";
const PostList = (props) => {
  return (
    <div>
      {props.posts.map((post) => (
        <PostItem key={post.id} post={post} {...props}></PostItem>
      ))}
    </div>
  );
};

export default PostList;
