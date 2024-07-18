const { serviceGetDriveById } = require('../services/drive');
const { joinUser } = require('../services/chat');

exports.joinDrive = async (req, res) => {
    // exports.joinDriver = async (req, res, socket) => {
    try {
        const currentDrive = await serviceGetDriveById(req.params.id);
        console.log("currentDrive",currentDrive);
        if (currentDrive.passengers.length < currentDrive.places) {
            currentDrive.passengers.push(req.body);
            await currentDrive.save();
           
            joinUser(socket, currentDrive.id, req.body.name);
            // joinUser(io);
            res.json(currentDrive.passengers)
        } else {
            console.log("donrt have a places");
        }
    } catch (error) {
        res.status(500).json({ message: 'dont connected' + error });
    }
};

exports.RemoveDrive = async (req, res) => {
    try {
        const currentDrive = getDriveById(req.params.id);
        currentDrive.passengers.slice(currentDrive.passengers.indexOf(passenger.id === req.body.id))
    } catch (error) {
        res.status(500).json({ message: 'dont connected' + error });
    }
};

exports.getDrive = async (req, res) => {
    console.log("getDrive");
    res.status(500).json({ message: 'getDrive' });
};