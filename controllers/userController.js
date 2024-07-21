const { serviceGetDriveById } = require('../services/drive');

const login = async (id, user, room) => {
    const currentDrive = await serviceGetDriveById(room,'drive');
    const frindsDrive = currentDrive.passengers.find((passenger)=> passenger.email === user.email )
    const existingUser = users.find(user => user.name.trim().toLowerCase() === name.trim().toLowerCase())

    if (!frindsDrive) return { error: "you don't frind in this drive" }
 
    
    return true
};



const deleteUser = (id) => {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) return users.splice(index, 1)[0];
}

// const getUsers = (room) => users.filter(user => user.room === room)

module.exports = { login,  deleteUser }