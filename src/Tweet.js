import React from "react";
import "./Tweet.css";

function Tweet() {
  return (
    <div className="tweet">
      <div className="tweet__userInfo"></div>
      <div className="tweet__imagesContainer"></div>
      <div className="tweet__textContainer"></div>
      <div className="tweet__dateContainer"></div>
    </div>
  );
}

export default Tweet;
