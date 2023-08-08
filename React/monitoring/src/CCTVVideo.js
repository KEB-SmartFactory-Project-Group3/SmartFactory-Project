// CCTVVideo.js
import React from 'react';

const CCTVVideo = (props) => {
  return (
    <div>
      <video src={props.streamUrl} autoPlay controls width="640" height="480" />
    </div>
  );
};

export default CCTVVideo;
