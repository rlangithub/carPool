const Drive = require('../models/drive');

exports.createDrive = async (req, res) => {
    try {
        const drv = await Drive.create(req.body);
        const roomName = `${drv.driveID}`; 
        io.of('/').adapter.on('create-room', (room) => {
            if (room === roomName) {
                console.log(`A new chat room "${roomName}" is created for drive ID ${drv._id}`);
            }})
        if(!drv)
            res.status(404).json({ message: 'Failed to get drv' });
        res.json(req.body);
    } catch (error) {
        res.status(500).json({ message: 'dont connected'+ error });
    }
};

exports.getByStartingPointToDestinationes = async (req, res) => {
    try {
        const { startingPoint, target} = req.body
        driverCollection = await Drive.find({startingPoint:startingPoint, target:target});
        res.json(driverCollection);

    } catch (error) {
        res.status(500).json({ message: 'dont connected' + error });
    }
};

// exports.getAllDrives = async (req, res) => {
//     try {
//         driverCollection = await Drive.find();
//         res.json(driverCollection);

//     } catch (error) {
//         res.status(500).json({ message: 'dont connected' });
//     }
// };

// exports.getDriveByName = async (req, res) => {
//     try {
//         const driver = await Drive.findOne(req.params.name);
//         res.json(driver);

//     } catch (error) {
//         res.status(500).json({ message: 'dont connected' });
//     }
// };

exports.deleteDrive = async (req, res) => {
    try {
        const drive = await Drive.findOneAndDelete({driveID:req.params.id});
        res.json(drive);
    } catch (err) {
        res.status(500).json({ message: 'dont connected' });
    }
};


exports.updateDrive = async (req, res) => {
    try {
        const drive = await Drive.findOneAndUpdate({driveID:req.params.id},req.body);
        if(!drive)
            res.status(404).json({ message: 'Failed to get drive' });
        res.json(drive);
    } catch (err) {
        res.status(500).json({ message: 'dont connected' });
    }
};