const Massage = require('../models/massage');
const { serviceGetDriveById } = require('../services/drive');

exports.createMassage = async (req, res) => {
    try {
        const currentDrive = await serviceGetDriveById(req.params.id);
        currentDrive.massages.push(req.body);
        await currentDrive.save();

        console.log("msg", res.body);
    } catch (error) {
        res.status(500).json({ message: 'dont connected' + error });
    }
};

exports.getAllMassages = async (req, res) => {
    try {
        MassageCollection = await Massage.find();
        res.json(MassageCollection);
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