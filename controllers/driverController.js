const Driver = require('../models/driver');
const { generateToken } = require('../middlewares/JWT')
exports.createDriver = async (req, res) => {
    try {
        let drv = req.body;
        if (req.body.driverID == null) {
            console.log("id null");
            drv = await Driver.create(req.body);
            if (!drv)
                res.status(404).json({ message: 'Failed to get drv' });
        }
        else {
            drv = this.getDriverByNameandPassword(req.body.name, req.body.password)
            console.log("drv", drv);
        }

        // const token = generateToken(drv.driverID, drv.password);
        // res.json(token);
    } catch (error) {
        res.status(500).json({ message: 'dont connected' + error });
    }
};

exports.getDriverByNameandPassword = async (name,password) => {
    try {
        console.log("getDriverByNameandPassword");
        const driver = await Driver.findOne(name, password);
        if (driver) {
            return (driver);
        }
        return (null);

    } catch (error) {
        return ('dont connected' );
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



exports.deleteDriver = async (req, res) => {
    try {
        const driver = await Driver.findOneAndDelete({ driverID: req.params.id });
        res.json(driver);
    } catch (err) {
        res.status(500).json({ message: 'dont connected' });
    }
};


exports.updateDriver = async (req, res) => {
    try {
        const driver = await Driver.findOneAndUpdate({ driverID: req.params.id }, req.body);
        if (!driver)
            res.status(404).json({ message: 'Failed to get driver' });
        res.json(driver);
    } catch (err) {
        res.status(500).json({ message: 'dont connected' });
    }
};