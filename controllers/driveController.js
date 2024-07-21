const { log } = require('console');
const Drive = require('../models/drive');
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const { joinUser } = require('../services/chat')
const { serviceGetDriveById } = require('../services/drive');
const { jwtMiddleware } = require('../middlewares/JWT')
exports.createDrive = async (req, res) => {
    try {
        if (jwtMiddleware(req.body.token,req.body.driver)) {
            const newDrive = await Drive.create(req.body.data);
            if (!newDrive)
                res.status(404).json({ message: 'Failed to get newDrive' });
            res.send(newDrive);
        } else {
            res.status(401).json({ error: 'אימות נכשל: טוקן לא תקין' })
        }

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
        const drives = await serviceGetDriveById(req.params.id,'drive' )
        res.send(drives);

    } catch (error) {
        res.status(500).json({ message: 'dont connected' });
    }
};

exports.deleteDrive = async (req, res) => {
    try {
        if (req.body.token && jwtMiddleware(req.body.token, req.body.driver)) {
            const drive = await Drive.findOneAndDelete({ id: req.params.id });
            res.status(200).json({ message: 'delete- sucsses' })
        } else {
            res.status(401).json({ error: 'אימות נכשל: טוקן לא תקין' })
        }

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