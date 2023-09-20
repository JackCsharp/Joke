import React from "react";
import classes from "./SearchBar.module.css";

const SearchBar = ({ query, setQuery }) => {
  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder=" Search"
      className={classes.searchBar}
      type="text"
    />
  );
};

export default SearchBar;
