const { serviceGetDriveById } = require('../services/drive');
const Drive = require('../models/drive');
const { joinUser } = require('../services/chat');

exports.joinDrive = async (req, res) => {
    // exports.joinDriver = async (req, res, socket) => {
    try {
        const currentDrive = await serviceGetDriveById(req.params.id);
        if (currentDrive.passengers.length < currentDrive.availablePlaces) {
            console.log("req.body", req.body);
            currentDrive.passengers.push(req.body);
            await currentDrive.save();
           
            // joinUser(socket, currentDrive.id, req.body.name);
            // joinUser(io);
            console.log("after joinUser");
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