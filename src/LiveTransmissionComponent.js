// LiveTransmissionComponent.js
import React, { useEffect, useState } from 'react';
import './LiveTransmissionComponent.css';
import axios from 'axios';

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
        if (liveImage) {
            try {
            // 서버로 가공되지 않은 데이터 URL을 전송합니다.
            const response = await axios.post("http://localhost:5000/capture-image", { liveImage });
            
            // 응답이 올바르게 반환되는지 확인하기 위해 결과를 다룹니다.
            console.log(response.data);

            } catch (error) {
            console.error("Error capturing image:", error);
            }
        }
    };

    useEffect(() => {
        const interval = setInterval(fetchLiveImage, 100); // 이미지를 0.1초마다 가져옵니다.
        return () => clearInterval(interval);
    }, []);

    return(
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
