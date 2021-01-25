import logo from "./logo.svg";
import "./App.css";
import TwitterIcon from "@material-ui/icons/Twitter";
import HomeIcon from "@material-ui/icons/Home";
import { Avatar } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Tweet from "./Tweet";
import React, { useEffect, useState } from "react";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

function App() {
  const [query, setQuery] = useState("coding");
  const [data, setData] = useState({});
  const [nextDataUrl, setNextDataUrl] = useState("");

  //Get initial twitter api data when app renders
  useEffect(() => {
    getTweets();
  }, []);

  //Retreive tweets from API
  const getTweets = async (q = query) => {
    const query = q;
    if (!query) {
      console.log("no query found");
      return;
    }
    const encodedQuery = encodeURIComponent(query); //Handle hashtags in query
    let url = `http://localhost:3000/tweets?q=${encodedQuery}&count=10`;

    console.log("URL: ", url);
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((newData) => {
        console.log("data from getTwitterData: ", newData);
        setData(newData);
        setNextDataUrl(newData.search_metadata.next_results);
      });
  };

  const updateInput = (input) => {
    setQuery(input);
  };

  const searchFunc = () => {
    console.log("Query: ", query);
    getTweets();
  };

  const searchHashtag = (q) => {
    console.log("Hashtag Query: ", q);
    setQuery(q);
    getTweets(q);
  };

  const hanldeKeyDown = (key) => {
    if (key === "Enter") {
      getTweets();
    }
  };

  const scrollToTop = () => {
    document.getElementById("main__tweetsList").scrollTop = 0;
  };

  //Retrieve next load of tweets
  const loadNextPage = () => {
    console.log("loadNextpage in Effect", nextDataUrl);
    let url = `http://localhost:3000/tweets${nextDataUrl}`;
    console.log("URL: ", url);
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((newData) => {
        const tempData = { ...newData };
        tempData.statuses = [...data.statuses].concat(tempData.statuses);
        // const tempData = [...data.statuses].push(newData.statuses);
        console.log("data from loadNextPage: ", newData, tempData);
        console.log("tempData: ", tempData);
        setData(tempData);
        setNextDataUrl(tempData.search_metadata.next_results);
      });
  };

  return (
    <div className="home-page">
      <div className="left">
        <TwitterIcon />
        <div className="left__home">
          <HomeIcon onClick={() => scrollToTop()} />
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
        <div className="main__tweetsList" id="main__tweetsList">
          {data.statuses?.map((tweet, index) => (
            <Tweet data={tweet} key={index} />
          ))}
          <div className="main__bottom">
            <ArrowDownwardIcon
              className="main__bottomIcon"
              onClick={() => loadNextPage()}
            />
          </div>
        </div>
      </div>
      <div className="right">
        <div className="right__trending">
          <div className="trendingTable">
            <div className="trendingTable__row">
              <p>Trends for you</p>
            </div>
            <div className="trendingTable__row">
              <p onClick={() => searchHashtag("#Coding")}>#Coding</p>
            </div>
            <div className="trendingTable__row">
              <p onClick={() => searchHashtag("#JavaScript")}>#JavaScript</p>
            </div>
            <div className="trendingTable__row">
              <p onClick={() => searchHashtag("#Python")}>#Python</p>
            </div>
            <div className="trendingTable__row"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
