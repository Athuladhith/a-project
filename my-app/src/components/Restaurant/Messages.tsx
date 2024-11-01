// import React, { useState, useEffect } from 'react';
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

// interface Conversation {
//   user: string;
//   messages: Message[];
// }

// const RestaurantMessages: React.FC = () => {
//   const [conversations, setConversations] = useState<Conversation[]>([]);
//   const [socket, setSocket] = useState<Socket | null>(null);
//   const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
//   const [restaurantid,setRestaurantid]= useState<string>('')
//   const restaurantId = localStorage.getItem('restaurantid');

//   useEffect(() => {
//     const restaurantId = localStorage.getItem('restaurantid');
//     console.log(restaurantId,"idd")
//     if (restaurantId) {
//       setRestaurantid(restaurantId); 
//     } else {
//       console.error('No restaurant ID found in local storage');
//     }
//   }, []);

//   // Fetch all conversations for the restaurant
//   useEffect(() => {
//     debugger
//     const fetchConversations = async () => {

//       try {
//         console.log('111')
//         const response = await axios.get(`http://localhost:5000/api/restaurant/conversations/${restaurantId}`);
//         console.log(response.data.conversation,"con 055")
//         setConversations(response.data.conversations);
//       } catch (error) {
//         console.error('Error fetching conversations:', error);
//         toast.error('Could not fetch conversations');
//       }
//     };

//     fetchConversations();
//   }, []);

//   useEffect(() => {
//     const newSocket = io('http://localhost:5000');
//     setSocket(newSocket);

//     newSocket.on('message', (data: Message) => {
//       console.log(data,"soclet")
//       if (selectedConversation) {
//         setSelectedConversation((prev) => ({
//           ...prev!,
//           messages: [...(prev?.messages || []), data],
//         }));
//       }
//     });

//     return () => {
//       newSocket.disconnect();
//     };
//   }, [selectedConversation]);

//   const handleConversationClick = (conversation: Conversation) => {
//     setSelectedConversation(conversation);
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gray-100">
//       <header className="bg-blue-500 text-white p-4 flex items-center justify-between">
//         <h1 className="text-lg font-bold">Messages</h1>
//       </header>

//       <div className="flex-grow flex">
//         {/* Conversations List */}
//         <aside className="w-full sm:w-1/3 bg-white border-r">
//           <div className="p-4">
//             <h2 className="font-semibold text-lg mb-4">User Conversations</h2>
//             <div className="overflow-y-auto h-80">
//               {conversations.length > 0 ? (
//                 conversations.map((conv, index) => (
//                   <div
//                     key={index}
//                     onClick={() => handleConversationClick(conv)}
//                     className={`cursor-pointer p-3 rounded-lg mb-2 bg-gray-200 hover:bg-blue-200 ${
//                       selectedConversation?.user === conv.user ? 'bg-blue-300' : ''
//                     }`}
//                   >
//                     <p className="font-semibold">{conv.user}</p>
//                     <p className="text-sm text-gray-600">Last message: {conv.messages[conv.messages.length - 1]?.content}</p>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-center text-gray-500">No conversations available</p>
//               )}
//             </div>
//           </div>
//         </aside>

//         {/* Messages Panel */}
//         <main className="flex-grow p-4">
//           {selectedConversation ? (
//             <>
//               <h2 className="font-bold text-lg mb-4">Conversation with {selectedConversation.user}</h2>
//               <div className="overflow-y-auto h-80 bg-white p-4 rounded-lg border border-gray-300">
//                 {selectedConversation.messages.map((message, index) => (
//                   <div key={index} className={`mb-4 flex ${message.sender === 'Restaurant' ? 'justify-end' : 'justify-start'}`}>
//                     <div className={`p-3 rounded-lg max-w-xs ${message.sender === 'Restaurant' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'}`}>
//                       <p className="font-medium">{message.sender}</p>
//                       <p>{message.content}</p>
//                       <span className="text-xs text-gray-500">{message.timestamp}</span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </>
//           ) : (
//             <p className="text-center text-gray-500">Select a conversation to view messages</p>
//           )}
//         </main>
//       </div>

//       <ToastContainer />
//     </div>
//   );
// };

// export default RestaurantMessages;



















// import React, { useState, useEffect } from 'react';
// import { io, Socket } from 'socket.io-client';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import 'tailwindcss/tailwind.css';
// import api from '../../api/Api';

// interface Message {
//   conversationId:string;
//   sender: string;
//   content: string;
//   timestamp: string;
// }

// interface Conversation {
 
//   user: string;
//   messages: Message[];
// }

// const RestaurantMessages: React.FC = () => {
//   const [conversations, setConversations] = useState<Conversation[]>([]);
//   const [socket, setSocket] = useState<Socket | null>(null);
//   const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
//   const restaurantId = 'your_restaurant_id'; // Replace this with the actual restaurant ID or fetch it from user context
//   const [newMessage, setNewMessage] = useState<string>('');
//   const [conversationId, setConversationId] = useState<string | null>(null);

//   // Fetch conversations from the database
//   const fetchConversations = async () => {
//     try {
//       const response = await api.get(`http://localhost:5000/api/restaurant/conversations/${restaurantId}`);
//       setConversations(response.data);

//       console.log(response.data,"convvvv")
//     } catch (error) {
//       console.error('Error fetching conversations:', error);
//       toast.error('Could not fetch conversations');
//     }
//   };

//   const sendMessage = async () => {
//     if (newMessage.trim() === '' || !selectedConversation) {
//       toast.error('Message cannot be empty');
//       return;
//     }

//     const message: Message = {
//       conversationId:'123',
//       sender: 'Restaurant',
//       content: newMessage,
//       timestamp: new Date().toISOString(),
//     };

//     if (socket) {
//       // Emit the message to the server via socket
//       socket.emit('message', {
//         conversationId: selectedConversation.user,
//         message: message.content,
//         sender: 'Restaurant',
//         timestamp: message.timestamp,
//       });

//       // Send message to the backend for saving in DB
//       try {
//         await api.post('http://localhost:5000/api/users/messages', {
//           conversationId: selectedConversation.user,
//           sender: 'Restaurant',
//           content: message.content,
//           timestamp: message.timestamp,
//         });

//         setSelectedConversation((prev) => {
//           if (prev) {
//             return {
//               ...prev,
//               messages: [...prev.messages, message],
//             };
//           }
//           return prev;
//         });
//         setNewMessage('');
//       } catch (error) {
//         console.error('Error sending message to backend:', error);
//         toast.error('Failed to send message');
//       }
//     }
//   };

//   useEffect(() => {
//     fetchConversations(); // Fetch conversations when the component loads

//     const newSocket = io('http://localhost:5000');
//     setSocket(newSocket);

//     newSocket.on('message', (data: Message) => {
//       setConversations((prev) =>
//         prev.map((conversation) => {
//           if (conversation.user === data.conversationId) {
//             return {
//               ...conversation,
//               messages: [...conversation.messages, data],
//             };
//           }
//           return conversation;
//         })
//       );
//     });

//     return () => {
//       newSocket.disconnect();
//     };
//   }, []);

//   return (
//     <div className="flex flex-col h-screen bg-gray-100">
//       <header className="bg-blue-500 text-white p-4">
//         <h1 className="text-lg font-bold">Restaurant Messages</h1>
//       </header>

//       <div className="flex-grow p-4 overflow-y-auto">
//         <h2 className="font-semibold mb-4">Conversations</h2>
//         <ul>
//           {conversations.map((conversation) => (
//             <li
//               key={conversation.user}
//               className="p-2 bg-white mb-2 rounded shadow cursor-pointer"
//               onClick={() => setSelectedConversation(conversation)}
//             >
//               <span>{conversation.user}</span>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {selectedConversation && (
//         <div className="flex-grow p-4 border-t border-gray-300">
//           <h2 className="font-semibold mb-4">{selectedConversation.user}</h2>
//           <div className="flex-grow overflow-y-auto">
//             {selectedConversation.messages.length > 0 ? (
//               selectedConversation.messages.map((message, index) => (
//                 <div key={index} className={`mb-4 ${message.sender === 'Restaurant' ? 'text-right' : 'text-left'}`}>
//                   <div className={`p-3 rounded-lg ${message.sender === 'Restaurant' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'}`}>
//                     <p className="font-medium">{message.sender}</p>
//                     <p>{message.content}</p>
//                     <span className="text-xs text-gray-500">{new Date(message.timestamp).toLocaleTimeString()}</span>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-center text-gray-500">No messages yet. Start the conversation!</p>
//             )}
//           </div>

//           <div className="bg-white p-4 flex items-center">
//             <input
//               type="text"
//               className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
//               placeholder="Type your message..."
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
//             />
//             <button className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" onClick={sendMessage}>
//               Send
//             </button>
//           </div>
//         </div>
//       )}

//       <ToastContainer />
//     </div>
//   );
// };

// export default RestaurantMessages;





import React, { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

const ENDPOINT = "http://localhost:5000";
let socket: Socket; // Define socket with type

interface Message {
    roomId: string;
    message: string;
}

const User2Chat: React.FC = () => {
    const [message, setMessage] = useState<string>(''); // State for message input
    const [messages, setMessages] = useState<string[]>([]); // State for messages

    useEffect(() => {
        socket = io(ENDPOINT);

        // Join a specific chat room
        socket.emit('joinRoom', { roomId: '123' });

        // Listen for messages
        socket.on('receiveMessage', (newMessage: Message) => {
            setMessages((prevMessages) => [...prevMessages, newMessage.message]); // Use newMessage.message
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const sendMessage = (e: React.FormEvent<HTMLFormElement>) => { // Type the event
        e.preventDefault();
        if (message.trim()) {
            const messageData: Message = { roomId: '123', message: `User2: ${message}` };
            socket.emit('sendMessage', messageData);
            setMessages((prevMessages) => [...prevMessages, messageData.message]); // Use messageData.message
            setMessage('');
        }
    };

    return (
        <div>
            <h2>User 2 Chat</h2>
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

export default User2Chat;
