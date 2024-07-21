
exports.joinUser = (socket, roomName, userName) => {
    console.log(`${userName} has joined room ${roomName}`);
    socket.join(roomName);
};