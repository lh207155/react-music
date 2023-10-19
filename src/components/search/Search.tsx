import React, { useRef } from "react";
import { useSearch } from "../../hooks/useSearch";
import styles from "./Search.module.css";
import { useNavigate } from "react-router-dom";
const Search = () => {
  const timer = useRef<number>(0);
  const nav = useNavigate();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      console.log(e.target.value);
      timer.current = 0;
      nav(`/search/${e.target.value}`);
    }, 1000);
  };
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <input
        type="text"
        className={styles.searchInput}
        placeholder="搜索"
        onChange={(e) => onChange(e)}
      />
    </div>
  );
};

export default Search;
