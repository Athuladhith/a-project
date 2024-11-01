// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import http from 'http';
// import { Server } from 'socket.io'; 
// import userRoutes from './routes/userroute'; 
// import connectDB from './config/Db';
// import adminroute from './routes/adminroute';
// import restaurantroute from './routes/restaurantroute';
// import deliveryroute from './routes/deliveryroute'

// dotenv.config();

// const app = express();

// // Create an HTTP server by wrapping the Express app
// const server = http.createServer(app);

// // Initialize Socket.io server
// const io = new Server(server, {
//   cors: {
//     origin: "*", // You can restrict this to specific domains if necessary
//     methods: ["GET", "POST"],
//   },
// });

// // Connect to MongoDB
// connectDB()
//   .then(() => {
//     // Middleware
//     app.use(cors());
//     app.use(express.json());

//     // Use the user routes
//     app.use('/api/users', userRoutes);
//     app.use('/api/admin', adminroute);
//     app.use('/api/restaurant', restaurantroute);
//     app.use('/api/deliveryperson',deliveryroute)

//     app.get('/', (req, res) => {
//       res.send('API is running...');
//     });

//     // Handle Socket.io connections
//     io.on('connection', (socket) => {
//       console.log('New client connected:', socket.id);

//       // Listen for custom events, e.g., "message"
//       socket.on('message', (messageData) => {
//         console.log('Message received:', messageData);

//         // You can broadcast the message to other users, for example
//         io.emit('message', messageData); // Broadcast the message to all connected clients
//       });

//       // Handle disconnection
//       socket.on('disconnect', () => {
//         console.log('Client disconnected:', socket.id);
//       });
//     });

//     const PORT = process.env.PORT || 5000;
//     server.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.error('Failed to connect to MongoDB:', error);
//     process.exit(1);
//   });










import express from 'express';
import http from 'http';
import { Server } from 'socket.io';



import cors from 'cors';
import dotenv from 'dotenv';


import userRoutes from './routes/userroute'; 
import connectDB from './config/Db';
import adminroute from './routes/adminroute';
import restaurantroute from './routes/restaurantroute';
import deliveryroute from './routes/deliveryroute'

dotenv.config();

// Create an instance of the express app
const app = express();
const PORT = 5000;

// Create an HTTP server
const server = http.createServer(app);

// Initialize the Socket.IO server with CORS options
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // Adjust according to your client URL
        methods: ["GET", "POST"]
    }
});

// Connect to MongoDB
connectDB()
  .then(() => {
    // Middleware
    app.use(cors());
    app.use(express.json());

    // Use the user routes
    app.use('/api/users', userRoutes);
    app.use('/api/admin', adminroute);
    app.use('/api/restaurant', restaurantroute);
    app.use('/api/deliveryperson',deliveryroute)

    app.get('/', (req, res) => {
      res.send('API is running...');
    });

  
// Define the structure of a message
interface MessageData {
    roomId: string;
    message: string;
}

// Handle socket connections
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Join a specific chat room based on user data
    socket.on('joinRoom', ({ roomId }: { roomId: string }) => {
        socket.join(roomId);
        console.log(`User joined room: ${roomId}`);
    });

    // Broadcast message to a specific room with an object format
    socket.on('sendMessage', ({ roomId, message }: MessageData) => {
        const messageObject = { message };
        io.to(roomId).emit('receiveMessage', messageObject);
    });



    /////////updation................
    socket.on('joinRoom', (restaurantId) => {
        socket.join(restaurantId);
        console.log(`Restaurant ${restaurantId} joined room: ${restaurantId}`);
      });
    
      // Handle order notification
      socket.on('orderNotification', ({ restaurantId, orderDetails }) => {
        // Emit notification to the specific restaurant room
        io.to(restaurantId).emit('orderNotification', orderDetails);
      });
    

    // socket.on('orderNotification', (orderDetails) => {
    //   console.log("noteeeeee")
    //   // Emit to all connected clients (or to a specific room if needed)
    //   io.emit('orderNotification', orderDetails);
    // });

    socket.on('delivery',(orderdetails)=>{
      console.log(orderdetails,"att ser ve dev")
      io.emit('delivery',orderdetails)
    })
  

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
})