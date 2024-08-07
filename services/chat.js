
exports.joinUser = (socket, roomName, userName) => {
    socket.join(roomName);
};