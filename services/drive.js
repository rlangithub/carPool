const Drive = require('../models/drive');

exports.serviceGetDriveById = async (id) => {
    try {
        // const drives = await Drive.find({driver:id});
        const drives = await Drive.findOne({id:id});
        return drives;

    } catch (error) {
       return({ message: 'dont connected' });
    }
};