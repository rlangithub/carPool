// exports.joinUser = (socket, roomName, userName,io) => {
//     socket.join(roomName);
//     console.log(`${userName} has joined room ${roomName}`);
// };
exports.joinUser = (io, roomName, userName) => {
    io.on('connection', (socket) => {
        console.log(`${userName} has joined room ${roomName}`);
        socket.join(roomName);
    });
};