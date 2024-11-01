// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { io, Socket } from 'socket.io-client';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import 'tailwindcss/tailwind.css';
// import api from '../../api/Api';

// interface Message {
//   sender: string;
//   content: string;
//   timestamp: string;
// }

// const ChatPage: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const [restaurantName, setRestaurantName] = useState<string>('');
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState<string>('');
//   const [conversationId, setConversationId] = useState<string | null>(null);
//   const [socket, setSocket] = useState<Socket | null>(null);

//   const storedUser = localStorage.getItem('userdetails');
//   const user = storedUser ? JSON.parse(storedUser) : null;

//   let userName = 'Guest';

//   if (storedUser) {
//     try {
//       const parsedUser = JSON.parse(storedUser);
//       userName = parsedUser.name || 'Guest';
//     } catch (error) {
//       console.error('Error parsing user details from localStorage:', error);
//     }
//   }

//   // Fetch restaurant details
//   useEffect(() => {
//     const fetchRestaurant = async () => {
//       try {
//         const response = await api.get(`http://localhost:5000/api/users/restaurant/${id}`);
//         setRestaurantName(response.data.restaurantName);
//       } catch (error) {
//         console.error('Error fetching restaurant:', error);
//       }
//     };

//     fetchRestaurant();
//   }, [id]);

//   // Check if the conversation exists
//   const checkConversation = async () => {
//     try {
//       const response = await api.get(`http://localhost:5000/api/users/conversations/exist/${id}/${JSON.parse(storedUser || '{}').id}`);
//       if (response.data.conversation) {
//         setConversationId(response.data.conversation._id);
//         setMessages(response.data.conversation.messages || []);
//       }
//     } catch (error) {
//       console.error('Error checking conversation:', error);
//       toast.error('Could not check conversation');
//     }
//   };

//   // Function to send message
//   const sendMessage = async () => {
//     if (newMessage.trim() === '') {
//       toast.error('Message cannot be empty');
//       return;
//     }

//     const message: Message = {
//       sender: userName,
//       content: newMessage,
//       timestamp: new Date().toISOString(),
//     };

//     if (socket && conversationId) {
//       // Emit the message to the server via socket
//       socket.emit('message', {
//         conversationId,
//         message: message.content,
//         sender: userName,
//         timestamp: message.timestamp,
//       });

//       // Send message to the backend for saving in DB
//       try {
//         await api.post('http://localhost:5000/api/users/messages', {
//           conversationId,
//           sender: userName,
//           content: message.content,
//           timestamp: message.timestamp,
//         });

//         setMessages((prevMessages) => [...prevMessages, message]);
//         setNewMessage('');
//       } catch (error) {
//         console.error('Error sending message to backend:', error);
//         toast.error('Failed to send message');
//       }
//     }
//   };

//   useEffect(() => {
//     checkConversation(); // Check if the conversation exists when the component loads
//   }, [id]);

//   useEffect(() => {
//     const newSocket = io('http://localhost:5000');
//     setSocket(newSocket);

//     if (conversationId) {
//       newSocket.emit('joinRoom', { conversationId });
//     }

//     newSocket.on('receiveMessage', (data: Message) => {
//       setMessages((prevMessages) => [...prevMessages, data]);
//     });

//     return () => {
//       newSocket.disconnect();
//     };
//   }, [conversationId]);

//   return (
//     <div className="flex flex-col h-screen bg-gray-100">
//       <header className="bg-blue-500 text-white p-4 flex items-center justify-between">
//         <h1 className="text-lg font-bold">{restaurantName ? `Chat with ${restaurantName}` : 'Loading...'}</h1>
//         <span className="text-sm">You are logged in as {userName}</span>
//       </header>

//       <div className="flex-grow p-4 overflow-y-auto">
//         {messages.length > 0 ? (
//           messages.map((message, index) => (
//             <div key={index} className={`mb-4 flex ${message.sender === userName ? 'justify-end' : 'justify-start'}`}>
//               <div className={`p-3 rounded-lg max-w-xs ${message.sender === userName ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'}`}>
//                 <p className="font-medium">{message.sender}</p>
//                 <p>{message.content}</p>
//                 <span className="text-xs text-gray-500">{new Date(message.timestamp).toLocaleTimeString()}</span>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-center text-gray-500">No messages yet. Start the conversation!</p>
//         )}
//       </div>

//       <div className="bg-white p-4 flex items-center">
//         <input
//           type="text"
//           className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
//           placeholder="Type your message..."
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
//         />
//         <button className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" onClick={sendMessage}>
//           Send
//         </button>
//       </div>

//       <ToastContainer />
//     </div>
//   );
// };

// export default ChatPage;











// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { io, Socket } from 'socket.io-client';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import 'tailwindcss/tailwind.css';
// import api from '../../api/Api';

// interface Message {
//   sender: string;
//   content: string;
//   timestamp: string;
// }

// const ChatPage: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const [restaurantName, setRestaurantName] = useState<string>('');
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState<string>('');
//   const [conversationId, setConversationId] = useState<string | null>(null);
//   const [socket, setSocket] = useState<Socket | null>(null);

//   const storedUser = localStorage.getItem('userdetails');
//   const user = storedUser ? JSON.parse(storedUser) : null;

//   let userName = 'Guest';
//   if (storedUser) {
//     try {
//       const parsedUser = JSON.parse(storedUser);
//       userName = parsedUser.name || 'Guest';
//     } catch (error) {
//       console.error('Error parsing user details from localStorage:', error);
//     }
//   }

//   // Fetch restaurant details
//   useEffect(() => {
//     const fetchRestaurant = async () => {
//       try {
//         const response = await api.get(`http://localhost:5000/api/users/restaurant/${id}`);
//         setRestaurantName(response.data.restaurantName);
//       } catch (error) {
//         console.error('Error fetching restaurant:', error);
//       }
//     };
//     fetchRestaurant();
//   }, [id]);

//   // Check if the conversation exists
//   const checkConversation = async () => {
//     try {
//       const response = await api.get(`http://localhost:5000/api/users/conversations/exist/${id}/${JSON.parse(storedUser || '{}').id}`);
//       if (response.data.conversation) {
//         setConversationId(response.data.conversation._id);
//         setMessages(response.data.conversation.messages || []);
//       }
//     } catch (error) {
//       console.error('Error checking conversation:', error);
//       toast.error('Could not check conversation');
//     }
//   };

//   // Function to send message
//   const sendMessage = async () => {
//     if (newMessage.trim() === '') {
//       toast.error('Message cannot be empty');
//       return;
//     }

//     const message: Message = {
//       sender: userName,
//       content: newMessage,
//       timestamp: new Date().toISOString(),
//     };

//     if (socket && conversationId) {
//       // Emit the message to the server via socket
//       socket.emit('message', {
//         conversationId,
//         message: message.content,
//         sender: userName,
//         timestamp: message.timestamp,
//       });

//       // Send message to the backend for saving in DB
//       try {
//         await api.post('http://localhost:5000/api/users/messages', {
//           conversationId,
//           sender: userName,
//           content: message.content,
//           timestamp: message.timestamp,
//         });

//         setMessages((prevMessages) => [...prevMessages, message]);
//         setNewMessage('');
//       } catch (error) {
//         console.error('Error sending message to backend:', error);
//         toast.error('Failed to send message');
//       }
//     }
//   };

//   useEffect(() => {
//     checkConversation(); // Check if the conversation exists when the component loads
//   }, [id]);

//   useEffect(() => {
//     const newSocket = io('http://localhost:5000');
//     setSocket(newSocket);

//     if (conversationId) {
//       newSocket.emit('joinRoom', { conversationId });
//     }

//     newSocket.on('message', (data: Message) => {
//       setMessages((prevMessages) => [...prevMessages, data]);
//     });

//     return () => {
//       newSocket.disconnect();
//     };
//   }, [conversationId]);

//   return (
//     <div className="flex flex-col h-screen bg-gray-100">
//       <header className="bg-blue-500 text-white p-4 flex items-center justify-between">
//         <h1 className="text-lg font-bold">{restaurantName ? `Chat with ${restaurantName}` : 'Loading...'}</h1>
//         <span className="text-sm">You are logged in as {userName}</span>
//       </header>

//       <div className="flex-grow p-4 overflow-y-auto">
//         {messages.length > 0 ? (
//           messages.map((message, index) => (
//             <div key={index} className={`mb-4 flex ${message.sender === userName ? 'justify-end' : 'justify-start'}`}>
//               <div className={`p-3 rounded-lg max-w-xs ${message.sender === userName ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'}`}>
//                 <p className="font-medium">{message.sender}</p>
//                 <p>{message.content}</p>
//                 <span className="text-xs text-gray-500">{new Date(message.timestamp).toLocaleTimeString()}</span>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-center text-gray-500">No messages yet. Start the conversation!</p>
//         )}
//       </div>

//       <div className="bg-white p-4 flex items-center">
//         <input
//           type="text"
//           className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
//           placeholder="Type your message..."
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
//         />
//         <button className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" onClick={sendMessage}>
//           Send
//         </button>
//       </div>

//       <ToastContainer />
//     </div>
//   );
// };

// export default ChatPage;




import React, { useEffect, useState, useRef, FormEvent } from 'react';
import io, { Socket } from 'socket.io-client';

const ENDPOINT = "http://localhost:5000";

interface Message {
    roomId: string;
    message: string;
}

const User1Chat: React.FC = () => {
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<string[]>([]);
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        socketRef.current = io(ENDPOINT);

        // Join a specific chat room
        socketRef.current.emit('joinRoom', { roomId: '123' });

        // Listen for messages
        socketRef.current.on('receiveMessage', (newMessage: Message) => {
            setMessages((prevMessages) => [...prevMessages, newMessage.message]);
        });

        return () => {
            socketRef.current?.disconnect();
        };
    }, []);

    const sendMessage = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (message.trim()) {
            const messageData: Message = { roomId: '123', message: `User1: ${message}` };
            socketRef.current?.emit('sendMessage', messageData);
            setMessages((prevMessages) => [...prevMessages, messageData.message]);
            setMessage('');
        }
    };

    return (
        <div>
            <h2>User 1 Chat</h2>
            <div style={{ border: '1px solid black', padding: '10px', height: '300px', overflowY: 'auto' }}>
                {messages.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>
            <form onSubmit={sendMessage}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default User1Chat;
