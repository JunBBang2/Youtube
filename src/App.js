import React, { useEffect, useState } from "react";
import styles from "./app.module.css";
import Search_header from "./components/serach_header/search_header";
import VideoList from "./components/vidoe_list/video_list";

function App() {
  const [videos, setVideos] = useState([]);
  const search = (query) => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `https://www.googleapis.com/youtube/v3/search/?part=snippet&maxResults=25&q=${query}&type=video&key=AIzaSyAhLurJjDUB78QLoFNwdH2fCaC76YLjSfA`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) =>
        result.items.map((item) => ({ ...item, id: item.id.videoId }))
      )
      .then((items) => setVideos(items))
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=25&key=AIzaSyAhLurJjDUB78QLoFNwdH2fCaC76YLjSfA",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setVideos(result.items))
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <div className={styles.app}>
      <Search_header onSearch={search} />
      <VideoList videos={videos} />
    </div>
  );
}

export default App;
