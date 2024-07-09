const Driver = require('../models/driver');
const { generateToken } = require('../services/jwt')
exports.createDriver = async (req, res) => {
    try {
        let drv = req.body;
        if (req.body.id == null) {
            console.log("id null");
            drv = await Driver.create(req.body);
            console.log("drv", drv)
            if (!drv)
                res.status(404).json({ message: 'Failed to get drv' });
        }
        else {
            drv = this.getDriverByNameandPassword(req.body.name, req.body.password)
            console.log("drv", drv);
        }
        const token = generateToken(drv.id, drv.password);
        console.log("token", token);
        res.send({ token: token, newDriver: drv });
        // res.send(drv);
    } catch (error) {
        res.status(500).json({ message: 'dont connected' + error });
    }
};

exports.getDriverByNameandPassword = async (name, password) => {
    try {
        console.log("getDriverByNameandPassword");
        const driver = await Driver.findOne(name, password);
        if (driver) {
            return (driver);
        }
        return (null);

    } catch (error) {
        return ('dont connected');
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

exports.getDriveById = async (req, res) => {
    try {
        const driver = await Driver.find({id:req.params.id});
        res.send(driver);

    } catch (error) {
        res.status(500).json({ message: 'dont connected' });
    }
};


exports.deleteDriver = async (req, res) => {
    try {
        const driver = await Driver.findOneAndDelete({ id: req.params.id });
        res.json(driver);
    } catch (err) {
        res.status(500).json({ message: 'dont connected' });
    }
};


exports.updateDriver = async (req, res) => {
    try {
        const driver = await Driver.findOneAndUpdate({ id: req.params.id }, req.body);
        if (!driver)
            res.status(404).json({ message: 'Failed to get driver' });
        res.json(driver);
    } catch (err) {
        res.status(500).json({ message: 'dont connected' });
    }
};