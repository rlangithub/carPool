// exports.joinUser = (socket, roomName, userName,io) => {
//     socket.join(roomName);
//     console.log(`${userName} has joined room ${roomName}`);
// };
exports.joinUser = (socket, roomName, userName) => {
    console.log(`${userName} has joined room ${roomName}`);
    socket.join(roomName);
};