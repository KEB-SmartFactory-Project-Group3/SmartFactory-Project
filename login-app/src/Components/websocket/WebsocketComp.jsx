import React, { useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import Cookies from 'js-cookie';
import Stomp from 'stompjs';

const WebsocketComp = () => {
  const socketUrl = 'http://165.246.116.128:8080/ws';
  const topics = ['/topic/machines_info/Machine A', '/topic/machines_info/Machine B', '/topic/machines_info/Machine C'];

  // JWT 토큰을 쿠키에서 가져오세요.
  const authToken = 'Bearer ' + Cookies.get('token');

  useEffect(() => {
    const socket = new SockJS(socketUrl);
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
          // 여기에서 받아온 machineInfo를 화면에 표시하는 로직을 구현하세요.
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

  return (
    <div>
      {/* 머신 정보를 표시할 컴포넌트 및 로직을 구현하세요. */}
    </div>
  );
};

export default WebsocketComp;