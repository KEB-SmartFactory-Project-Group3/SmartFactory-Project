import logo from './logo.svg';
import './App.css';
import React from 'react';
import Streamedian from './Streamdian';
import CCTVVideo from './CCTVVideo';

function App() {

  const streamUrl = 'http://165.246.117.60/mjpeg/1';
  let post = 'ESP32 WEBCAM STREAMING';

  return (
    <div className="App">
      <div className="black-nav">
        <h4> CCTV 모니터링 홈페이지 </h4>
      </div>
        <h4> { post } </h4>
        <h1>실시간 CCTV 영상</h1>
        <CCTVVideo streamUrl={streamUrl} />
        
    </div>
  );
}

export default App;

// const App=()=>{
//   return (
//     <div className="App" >

//       <Streamedian id="test" url="rtsp://165.246.117.60/mjpeg/1" />
//     </div>
//   );
// }

// export default App;

