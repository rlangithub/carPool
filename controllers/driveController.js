const { log } = require('console');
const Drive = require('../models/drive');
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const { joinUser } = require('../services/chat')
const { serviceGetDriveById } = require('../services/drive');
// exports.createDrive = async (req, res, io, socket) => {
    exports.createDrive = async (req, res) => {
    try {
        const drv = await Drive.create(req.body);
        // const populatedDrive = await Drive.findById(drv._id).populate('driver', 'name');
        // if (!populatedDrive) {
        //     res.status(404).json({ message: 'Failed to get drv' });
        //     return;
        // }
        // console.log(`1 Driver's name for this drive: ${populatedDrive.driver.name}`);
        // console.log('2', populatedDrive);
        // const roomName = `${drv.id}`;
        // io.emit('create-room', roomName);
        // console.log('3 after io.emit');
        // io.of('/').adapter.on('create-room', (room) => {
        //     console.log("io.of");
        //     if (room === roomName) {
        //         console.log(`A new chat room "${roomName}" is created for drive ID ${drv._id}`);
        //     }
        // })
        // joinUser(io,socket, roomName, populatedDrive.driver.name);
        // console.log('4 after joinUser');
        if (!drv)
            res.status(404).json({ message: 'Failed to get drv' });
        res.json(req.body);
    } catch (error) {
        res.status(500).json({ message: 'dont connected' + error });
    }
};

exports.getByStartingPointToDestinationes = async (req, res) => {
    try {
        const { startingPoint, target } = req.body
        driverCollection = await Drive.find({ startingPoint: startingPoint, target: target });
        res.json(driverCollection);

    } catch (error) {
        res.status(500).json({ message: 'dont connected' + error });
    }
};

exports.getAllDrives = async (req, res) => {
    try {
        driveCollection = await Drive.find();
        res.send(driveCollection);

    } catch (error) {
        res.status(500).json({ message: 'dont connected' });
    }
};

exports.getDriveById = async (req, res) => {
    try {
        console.log('req.params.id',req.params.id);
        const drives = await serviceGetDriveById(req.params.id)
        res.send(drives);

    } catch (error) {
        res.status(500).json({ message: 'dont connected' });
    }
};

exports.deleteDrive = async (req, res) => {
    try {
        const drive = await Drive.findOneAndDelete({ id: req.params.id });
        res.json(drive);
    } catch (err) {
        res.status(500).json({ message: 'dont connected' });
    }
};


exports.updateDrive = async (req, res) => {
    try {
        const drive = await Drive.findOneAndUpdate({ id: req.params.id }, req.body);

        if (!drive)
            res.status(404).json({ message: 'Failed to get drive' });
        res.json(drive);
    } catch (err) {
        res.status(500).json({ message: 'dont connected' });
    }
};