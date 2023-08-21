import React, { useEffect, useState } from 'react';
import { fetchLiveTransmission, captureImage } from '../api/ComputervisionApi'; // 경로는 실제 파일의 위치에 맞게 수정
// import './LiveTransmissionComponent.css';
import { Typography } from '@mui/material';

const LiveTransmissionComponent = () => {
  const [liveImage, setLiveImage] = useState('');

  const fetchLiveImage = async () => {
    try {
      const imageData = await fetchLiveTransmission();
      setLiveImage(`data:image/jpeg;base64,${imageData}`);
    } catch (error) {
      console.error('Error fetching live image:', error);
    }
  };

  // const handleCaptureImage = async () => {
  //   if (liveImage) {
  //     try {
  //       const response = await captureImage(liveImage);
  //       console.log(response);
  //     } catch (error) {
  //       console.error('Error capturing image:', error);
  //     }
  //   }
  // };

  useEffect(() => {
    const interval = setInterval(fetchLiveImage, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="live-transmission-container">
      <div className="black-nav">
      <Typography variant="subtitle1" style={{ fontWeight: 'bold', marginBottom: '10px' }}>
          불량품 검출
      </Typography>
      </div>
      {liveImage ? (
        <img className="live-transmission-image" src={liveImage} alt="live transmission" />
      ) : (
        <p>Loading live transmission...</p>
      )}
      {/* <button className="capture-button" onClick={handleCaptureImage}>
        Capture Image
      </button> */}
    </div>
  );
};

export default LiveTransmissionComponent;
