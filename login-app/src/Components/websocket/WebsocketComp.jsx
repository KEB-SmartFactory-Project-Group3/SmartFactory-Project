import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client, Stomp } from '@stomp/stompjs';
import Cookies from 'js-cookie';

const WebsocketComp = () => {
  const socketUrl = 'http://165.246.116.152:8080/ws';
  const topics = ['/topic/machines_info/Machine A', '/topic/machines_info/Machine B', '/topic/machines_info/Machine C']

  // JWT 토큰을 쿠키에서 가져옴
  const authToken = 'Bearer ' + Cookies.get('token');

  const [receivedInfo, setReceivedInfo] = useState([])

  useEffect(() => {
    const socket = new SockJS(client);
    const stompClient = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {
        'Authorization': authToken,
      },
    });

    stompClient.onConnect = (frame) => {
      console.log('Connected: ', frame);
      topics.forEach(topic => {
        stompClient.subscribe(topic, (message) => {
          const machineInfo = JSON.parse(message.body);
          console.log(machineInfo);
          setReceivedInfo(prevInfo => [...prevInfo,machineInfo])
        });
      });
    };

    stompClient.activate();

    return () => {
      if (stompClient.connected) {
        stompClient.deactivate();
      }
    };
  }, []);

  function handlesubscribe() {
    console.log(receivedInfo);
  }
  

  return (
    <div>
      <button onClick={handlesubscribe}>send to</button>
      <div>
        {receivedInfo.map((info,index) => (
          <div key={index}>
            {JSON.stringify(info)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WebsocketComp;