// import React, { useRef, useEffect } from 'react';
// import SockJS from 'sockjs-client';
// import { Client } from '@stomp/stompjs';
// import { useAuth } from '../SignIn/security/AuthContext';
// import { useCookies } from 'react-cookie';

// function WebsocketComp() {
//   const clientRef = useRef(null);
//   const { isAuthenticated } = useAuth();
//   const [cookies] = useCookies(['accessToken']);

//   useEffect(() => {
//     if (isAuthenticated) {
//       const socketUrl = 'https://165.246.116.143:8080/ws'; 
//       //const socketUrl = 'ws://165.246.116.143:8080/ws';

//       const topics = ['/topic/machines_info/Machine-A', '/topic/machines_info/Machine-B', '/topic/machines_info/Machine-C'];

//       const client = new Client({
//         webSocketFactory: () => new SockJS(socketUrl),

//         connectHeaders: {
//           Authorization: `Bearer ${cookies.accessToken}`, 
//         },
        
//         debug: function (str) {
//           console.log("debug:",str);
//           // console.log("token :",cookies.accessToken);
//         },
//         reconnectDelay: 5000,
//         heartbeatIncoming: 4000,
//         heartbeatOutgoing: 4000,
//       });

//       client.onConnect = function (frame) {
//         console.log('Connected:', frame);
//         topics.forEach(topic => {
//           client.subscribe(topic, message => {
//             console.log('Message received:', message.body);
//           });
//         });
//       };

//       client.onStompError = function (frame) {
//         console.log('Broker reported error:', frame.headers['message']);
//         console.log('Additional details:', frame.body);
//       };

//       client.activate();
//       clientRef.current = client;

//       return () => {
//         client.deactivate();
//       };
//     }
//   }, [cookies.accessToken, isAuthenticated]);

//   const handleClickSendTo = () => {
//     const destination = '/send-command/Machine-A'; // 적절한 목적지로 변경
//     const message = 'Yaya';
//     clientRef.current.publish({ destination, body: message });
//   };

//   return (
//     <div>
//       <button onClick={handleClickSendTo}>Send To Server</button>
//     </div>
//   );
// }

// export default WebsocketComp;
