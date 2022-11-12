import React from "react";
import { ISearch } from "../../../utils/icons";
import "./Empty.css";

const Empty = () => {
  return (
    <div className="emptyList-wrap">
      <img src={ISearch} alt="empty" />
    </div>
  );
};

export default Empty;
