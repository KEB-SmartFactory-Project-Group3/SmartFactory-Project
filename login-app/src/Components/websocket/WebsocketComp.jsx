import React, { useRef, useEffect } from 'react';
import { Client } from '@stomp/stompjs';

function WebsocketComp() {
  const clientRef = useRef(null);

  useEffect(() => {
    const socketUrl = 'ws://165.246.116.110:8080/ws';
    const topics = ['/topic/machines_info/Machine A', '/topic/machines_info/Machine B', '/topic/machines_info/Machine C'];

    const client = new Client({
      brokerURL: socketUrl,
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = function (frame) {
      console.log('Connected:', frame);
      topics.forEach(topic => {
        client.subscribe(topic, message => {
          console.log('Message received:', message.body);
        });
      });
    };

    client.onStompError = function (frame) {
      console.log('Broker reported error:', frame.headers['message']);
      console.log('Additional details:', frame.body);
    };

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
    };
  }, []);

  const handleClickSendTo = () => {
    const destination = '/app/someDestination'; // 적절한 목적지로 변경
    const message = 'Yaya';
    clientRef.current.publish({ destination, body: message });
  };

  return (
    <div>
      <button onClick={handleClickSendTo}>Send To Server</button>
    </div>
  );
}

export default WebsocketComp;
