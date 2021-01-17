import logo from "./logo.svg";
import "./App.css";
import TwitterIcon from "@material-ui/icons/Twitter";
import HomeIcon from "@material-ui/icons/Home";
import { Avatar } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Tweet from "./Tweet";

function App() {
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
          <input type="text" placeholder="Search Twitter" />
          <SearchIcon className="input__searchIcon" />
        </div>
        <div className="main__tweetsList">
          <Tweet />
        </div>
      </div>
      <div className="right">
        <div className="right__trending"></div>
      </div>
    </div>
  );
}

export default App;
