require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const driverRouter = require('./routes/driver');
const driveRouter = require('./routes/drive');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
app.use(bodyParser.json());
app.use('/driver', driverRouter);
app.use('/drive', driveRouter);
const PORT = process.env.PORT || 5000;


const io = new Server(server, {
  cors: {
    origin: '*',
    credentials: true,
  },
});


// טיפול באירועים של socket.io
io.on('connection', (socket) => {
    console.log('משתמש חדש מחובר');

    // כאשר נסיעה חדשה נוצרת
    socket.on('createRoom', (roomName) => {
        // יצירת חדר צ'אט חדש
        socket.join(roomName);
        console.log(`חדר צ'אט חדש נוצר: ${roomName}`);
    });

    // טיפול בהודעות שנשלחות בחדר צ'אט
    socket.on('chatMessage', (message) => {
        // לשלוח את ההודעה לחדר המתאים
        io.to(message.room).emit('chatMessage', message);
    });

    // טיפול בהתנתקות
    socket.on('disconnect', () => {
        console.log('משתמש מנותק');
    });
});








mongoose.connect(process.env.CONECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true}).then(
    ()=>app.listen(PORT,()=>console.log(`server runing on port ${PORT}`)))
    .catch((error)=>console.log(error.message));
