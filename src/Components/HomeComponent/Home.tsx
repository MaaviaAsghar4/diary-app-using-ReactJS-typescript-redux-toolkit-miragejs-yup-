import React from "react";
import Diary from "../DiaryComponents/Diary";
import Editor from "../DiaryComponents/Editor";

const Home = () => {
  return (
    <div className="d-flex align-items-start">
      <Diary />
      <Editor />
    </div>
  );
};

export default Home;
