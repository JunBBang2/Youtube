import React, { useEffect, useState } from "react";
import "./app.css";
import VideoList from './components/vidoe_list/video_list';

function App() {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResult=25&key=AIzaSyAhLurJjDUB78QLoFNwdH2fCaC76YLjSfA",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setVideos(result.items))
      .catch((error) => console.log("error", error));
  }, []);

  return <VideoList videos={videos}/>;
}

export default App;
