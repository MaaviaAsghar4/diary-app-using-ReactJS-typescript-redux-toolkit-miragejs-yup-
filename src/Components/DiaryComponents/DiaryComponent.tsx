import React, { FC } from "react";
import { Diary } from "../../Interface/type";

interface diaryProp {
  diary: Diary;
}

const DiaryComponent: FC<diaryProp> = (prop) => {
  return <div>DiaryComponent</div>;
};

export default DiaryComponent;
