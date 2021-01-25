import React, { useEffect, useState } from "react";
import "./Tweet.css";
import { Avatar } from "@material-ui/core";
import moment from "moment";

function Tweet({ data }) {
  const [createdDate, setCreatedDate] = useState("");

  useEffect(() => {
    //Set createdDate
    const timeFromNow = moment(data.created_at).fromNow();
    setCreatedDate(timeFromNow);

    data.extended_entities &&
      console.log("media found: ", data.extended_entities.media);
  }, []);

  return (
    <div className="tweet">
      <div className="tweet__userInfo">
        <Avatar src={data.user.profile_image_url} />
        <div className="username">
          <h4>{data.user.name}</h4>
          <p>@{data.user.screen_name}</p>
        </div>
      </div>

      {/* Render images */}
      {data.extended_entities?.media[0].type === "photo" && (
        <div className="tweet__imagesContainer">
          {data.extended_entities?.media?.map((image) => (
            <div
              className="tweet__image"
              style={{
                backgroundImage: `url(${image.media_url_https})`,
              }}
            ></div>
          ))}
        </div>
      )}

      {/* Render Videos */}
      {data.extended_entities?.media[0].type === "video" && (
        <div className="tweet_videoContainer">
          <video controls>
            <source
              src={
                data.extended_entities?.media[0]?.video_info.variants.find(
                  (variant) => variant.content_type === "video/mp4"
                ).url
              }
              type="video/mp4"
            />
          </video>
        </div>
      )}

      {/* Render GIF */}
      {data.extended_entities?.media[0].type === "animated_gif" && (
        <div className="tweet_videoContainer">
          <video loop autoPlay>
            <source
              src={
                data.extended_entities?.media[0]?.video_info.variants.find(
                  (variant) => variant.content_type === "video/mp4"
                ).url
              }
              type="video/mp4"
            />
          </video>
        </div>
      )}

      <div className="tweet__textContainer">
        <p>{data.full_text}</p>
      </div>
      <div className="tweet__dateContainer">
        <p>{createdDate}</p>
      </div>
    </div>
  );
}

export default Tweet;
