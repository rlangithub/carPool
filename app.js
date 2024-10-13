require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { joinUser } = require('./services/chat')
const { addUser, getUser, deleteUser, getUsers } = require('./controllers/userController')

const driverRouter = require('./routes/driver');
const driveRouter = require('./routes/drive');
const passengerRouter = require('./routes/passenger');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        credentials: true,
    },
});
app.use(cors());

//Infrastructure for real time. In development process.
// io.on('connection', (socket) => {

//     socket.on('login', ({ passenger:{name,email}, room }, callback) => {
//         console.log('login');
//         const member = login(socket.id, {name,email}, room)
//         if (!member) return callback(error)
//         socket.join(member.room)
//         socket.in(room).emit('notification', { title: 'Someone\'s here', description: `${user.name} just entered the room` })
//         io.in(room).emit('users', getUsers(room))
//         callback()
//     })


//     socket.on('sendMessage',({passenger:{name,email},room, message}) => {
//         console.log("sendMessage", message);
//         io.in(room).emit('message', { user: {name,email}, text: message });
//     })

// טיפול בהתנתקות
// socket.on("disconnect",name,room, () => {
//     console.log("User disconnected");
//     if (passenger) {
//         io.in(room).emit('notification', { title: 'Someone just left', description: `${name} just left the room` })
//         // io.in(room).emit('users', getUsers(user.room))
//     }
//     console.log("User disconnected2");
// })


// });

const CHAT_BOT = 'ChatBot'; // Add this

io.on('connection', (socket) => {
    console.log(`User connected ${socket.id}`);

    socket.on('join_room', (data) => {
        console.log("data");

        const { username, room } = data;
        socket.join(room);
    });
    // Add this
    let __createdtime__ = Date.now(); // Current timestamp
    // Send message to all users currently in the room, apart from the user that just joined
    socket.to(room).emit('receive_message', {
      message: `${username} has joined the chat room`,
      username: CHAT_BOT,
      __createdtime__,
    });

});


// Middleware
app.use(bodyParser.json());

// Routes
app.use('/driver', driverRouter);
// app.use('/drive', driveRouter(io));
app.use('/drive', driveRouter);

// app.use('/join', passengerRouter(io));
app.use('/join', passengerRouter);
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        server.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error.message);
    });

module.exports = app;