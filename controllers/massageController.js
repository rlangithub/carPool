const Massage = require('../models/massage');
exports.createMassage = async (req, res) => {
    try {
        console.log("massage");
        const msg = await Massage.create(req.body);

        if (!msg)
            res.status(404).json({ message: 'Failed to get msg' });
        console.log("msg", msg);
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