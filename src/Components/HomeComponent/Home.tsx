import React from "react";
import DiaryMain from "../DiaryComponents/Diary";
import Editor from "../DiaryComponents/Editor";

const Home = () => {
  return (
    <div className="d-flex align-items-start">
      <DiaryMain />
      <Editor />
    </div>
  );
};

export default Home;
