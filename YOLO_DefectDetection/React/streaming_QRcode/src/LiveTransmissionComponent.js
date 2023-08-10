// LiveTransmissionComponent.js
import React, { useEffect, useState } from 'react';
import './LiveTransmissionComponent.css';

const LiveTransmissionComponent = () => {
    const [liveImage, setLiveImage] = useState('');

    const fetchLiveImage = async () => {
    try {
        const response = await fetch('http://127.0.0.1:5000/get-live-transmission');
        const data = await response.json();
        setLiveImage(`data:image/jpeg;base64,${data.image}`);
    } catch (error) {
        console.error('Error fetching live image:', error);
    }
    };

    const captureImage = async () => {
    try {
        const response = await fetch('http://127.0.0.1:5000/capture-image');
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'captured_image.jpg';
        link.click();
        URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error capturing image:', error);
    }
    };

    useEffect(() => {
        const interval = setInterval(fetchLiveImage, 100); // 이미지를 0.1초마다 가져옵니다.
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="live-transmission-container">
            <div className="black-nav">
        <h4> CCTV 모니터링 홈페이지 </h4>
        </div>
        {liveImage ? (
            <img className="live-transmission-image" src={liveImage} alt="live transmission" />
        ) : (
            <p>Loading live transmission...</p>
        )}
        <button className="capture-button" onClick={captureImage}>
            Capture Image
        </button>
        </div>
    );
};

export default LiveTransmissionComponent;
