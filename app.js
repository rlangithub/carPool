// require("dotenv").config();
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const driverRouter = require('./routes/driver');
// const driveRouter = require('./routes/drive');
// const massageRouter = require('./routes/massage')
// const http = require('http');
// const { Server } = require('socket.io');

// const app = express();
// const server = http.createServer(app);
// const PORT = process.env.PORT || 5000;


// const io = new Server(server, {
//     cors: {
//         origin: '*',
//         credentials: true,
//     },
// });


// // טיפול באירועים של socket.io
// io.on('connection', (socket) => {
//     console.log('משתמש חדש מחובר');

//     // Handle 'create-room' event here
//     socket.on('create-room', (roomName) => {
//         console.log(`A new chat room "${roomName}" is requested`);
//         // You can then emit events or perform actions related to room creation
//     });

//     // טיפול בהודעות שנשלחות בחדר צ'אט
//     socket.on('chatMessage', (message) => {
//         // לשלוח את ההודעה לחדר המתאים
//         io.to(message.room).emit('chatMessage', message);
//     });

//     // טיפול בהתנתקות
//     socket.on('disconnect', () => {
//         console.log('משתמש מנותק');
//     });
// });

// app.use(bodyParser.json());
// app.use('/driver', driverRouter(io));
// app.use('/drive', driveRouter(io))
// app.use('/massage', massageRouter);

// mongoose.connect(process.env.CONECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(
//     () => app.listen(PORT, () => console.log(`server runing on port ${PORT}`)))
//     .catch((error) => console.log(error.message));

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
const massageRouter = require('./routes/massage');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        credentials: true,
    },
});
app.use(cors());


// טיפול באירועים של socket.io
io.on('connection', (socket) => {
    console.log('new user');
    // socket.on('new', (name, room) => {
    //     console.log('new -room',room );
    //     const user  = addUser(socket.id, name, room);
    //     console.log("user",user);
    //     // socket.join(user.room)
    //     joinUser(socket, room, name);
    //     console.log("after joinUser");
    //     // socket.in(room).emit('notification', { title: 'Someone\'s here', description: `${user.name} just entered the room` })
    //     // io.in(room).emit('users', getUsers(room))
    // })
    

    // Handle 'create-room' event here
    socket.on('create-room', (roomName) => {
        console.log(`A new chat room "${roomName}" is requested`);
        // You can then emit events or perform actions related to room creation
    });

    // socket.on('message', (message) => {
    //     console.log("message function");
    //     io.emit('message', message);
    //   });

    socket.on('login', ({ name, room }, callback) => {
        console.log('login');
        const { user, error } = addUser(socket.id, name, room)
        if (error) return callback(error)
        socket.join(user.room)
        socket.in(room).emit('notification', { title: 'Someone\'s here', description: `${user.name} just entered the room` })
        io.in(room).emit('users', getUsers(room))
        callback()
    })


    // טיפול בהודעות שנשלחות בחדר צ'אט
    // socket.on('chatMessage', (message) => {
    //     // לשלוח את ההודעה לחדר המתאים
    //     io.to(message.room).emit('chatMessage', message);
    // });

    //טיפול בהודאה חדשה שנשלחה מהמשתמש
    socket.on('sendMessage', message => {
        console.log("sendMessage", message);
        const user = getUser(socket.id);
        console.log("user object",user);
        io.in(user.room).emit('message', { user: user.name, text: message });
    })

    // טיפול בהתנתקות
    socket.on("disconnect", () => {
        console.log("User disconnected");
        const user = deleteUser(socket.id)
        if (user) {
            io.in(user.room).emit('notification', { title: 'Someone just left', description: `${user.name} just left the room` })
            io.in(user.room).emit('users', getUsers(user.room))
        }
        console.log("User disconnected2");
    })


});

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/driver', driverRouter);
app.use('/drive', driveRouter(io));
app.use('/massage', massageRouter);

const PORT = process.env.PORT || 5000;
const CONNECTION_URL = process.env.CONNECTION_URL;

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