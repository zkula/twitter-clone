import logo from "./logo.svg";
import "./App.css";
import TwitterIcon from "@material-ui/icons/Twitter";
import HomeIcon from "@material-ui/icons/Home";
import { Avatar } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Tweet from "./Tweet";
import React, { useEffect, useState } from "react";
import { getTwitterData } from "./exercise/js/index";

function App() {
  const [query, setQuery] = useState("coding");
  const [data, setData] = useState([]);

  //FIX THIS - NEWDATA RETURNS A PROMISE INSTEAD OF DATA
  useEffect(() => {
    getTwitterData(query).then((newData) => {
      console.log("getting data:", newData, newData?.statuses);
      newData && setData(newData.statuses);
    });
  }, []);

  useEffect(() => {
    console.log("data:", data);
  }, [data]);

  const updateInput = (input) => {
    setQuery(input);
  };

  const searchFunc = () => {
    console.log("Query: ", query);
    getTwitterData(query).then((newData) => {
      newData && setData(newData.statuses);
    });
  };

  const hanldeKeyDown = (key) => {
    if (key === "Enter") {
      getTwitterData(query).then((newData) => {
        newData && setData(newData.statuses);
      });
    }
  };

  return (
    <div className="home-page">
      <div className="left">
        <TwitterIcon />
        <div className="left__home">
          <HomeIcon />
        </div>
        <Avatar src="https://i.insider.com/5bd196e05f5e950fcc71db52?width=1100&format=jpeg&auto=webp" />
      </div>
      <div className="main">
        <div className="main__input">
          <input
            type="text"
            placeholder="Search Twitter"
            value={query}
            onChange={(e) => updateInput(e.target.value)}
            onKeyDown={(e) => hanldeKeyDown(e.key)}
          />
          <SearchIcon
            className="input__searchIcon"
            onClick={() => searchFunc()}
          />
        </div>
        <div className="main__tweetsList">
          {data.map((tweet, index) => (
            <Tweet data={tweet} key={index} />
          ))}
          {/* <Tweet data={data} />
          <Tweet data={data} /> */}
        </div>
      </div>
      <div className="right">
        <div className="right__trending">
          <div className="trendingTable">
            <div className="trendingTable__row">
              <p>Trends for you</p>
            </div>
            <div className="trendingTable__row">
              <p>#Coding</p>
            </div>
            <div className="trendingTable__row">
              <p>#JavaScript</p>
            </div>
            <div className="trendingTable__row">
              <p>#Python</p>
            </div>
            <div className="trendingTable__row"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
