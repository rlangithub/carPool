const Driver = require('../models/driver');
const { generateToken } = require('../services/jwt')
exports.createDriver = async (req, res) => {
    try {
        let curentDriver = req.body;
        if (curentDriver.phone === '' | curentDriver.phone === null) {
            curentDriver = await this.getDriverByNameandPassword(curentDriver.name, curentDriver.password);
        }
        else {
            curentDriver = await Driver.create(req.body);
            if (!curentDriver) {
                res.status(404).json({ message: 'Failed to get curentDriver' });
            }
        }
        const token = generateToken(curentDriver.id, curentDriver.password);

        res.send({ token: token, newDriver: curentDriver });
    } catch (error) {
        res.status(500).json({ message: 'dont connected' + error });
    }
};

exports.getDriverByNameandPassword = async (name, password) => {
    try {
        const driver = await Driver.findOne({name:name, password:password});
        if (!driver) {
            return "dont found";
        }
        return driver;

    } catch (error) {
        return null;
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
        const driver = await Driver.find({ id: req.params.id });
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