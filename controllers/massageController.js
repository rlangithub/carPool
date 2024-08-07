const Massage = require('../models/massage');
const { serviceGetDriveById } = require('../services/drive');

exports.createMassage = async (req, res) => {
    try {
        const currentDrive = await serviceGetDriveById(req.params.id,'drive');
        currentDrive.massages.push(req.body);
        await currentDrive.save();
    } catch (error) {
        res.status(500).json({ message: 'dont connected' + error });
    }
};

exports.getAllMassages = async (req, res) => {
    try {
        const currentDrive = await serviceGetDriveById(req.params.id,'drive');
        res.send(currentDrive.masseges);
    } catch (error) {
        res.status(500).json({ message: 'dont connected' });
    }
};

exports.deleteMassage = async (req, res) => {
    try {
        const massage = await Massage.findOneAndDelete({ massageID: req.params.id });
        res.json(massage);
    } catch (err) {
        res.status(500).json({ message: 'dont connected' });
    }
};