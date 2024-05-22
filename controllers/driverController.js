const Driver = require('../models/driver');

exports.createDriver = async (req, res) => {
    try {
        const drv = await Driver.create(req.body);
        if(!drv)
            res.status(404).json({ message: 'Failed to get drv' });
        res.json(req.body);
    } catch (error) {
        res.status(500).json({ message: 'dont connected'+ error });
    }
};

exports.getAllDrivers = async (req, res) => {
    try {
        driverCollection = await Driver.find();
        res.json(driverCollection);

    } catch (error) {
        res.status(500).json({ message: 'dont connected' });
    }
};

// exports.getDriverByName = async (req, res) => {
//     try {
//         const driver = await Driver.findOne(req.params);
//         res.json(driver);

//     } catch (error) {
//         res.status(500).json({ message: 'dont connected' });
//     }
// };

exports.deleteDriver = async (req, res) => {
    try {
        const driver = await Driver.findOneAndDelete({driverID:req.params.id});
        res.json(driver);
    } catch (err) {
        res.status(500).json({ message: 'dont connected' });
    }
};


exports.updateDriver = async (req, res) => {
    try {
        const driver = await Driver.findOneAndUpdate({driverID:req.params.id},req.body);
        if(!driver)
            res.status(404).json({ message: 'Failed to get driver' });
        res.json(driver);
    } catch (err) {
        res.status(500).json({ message: 'dont connected' });
    }
};