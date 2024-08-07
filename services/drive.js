const Drive = require('../models/drive');

exports.serviceGetDriveById = async (id,parent) => {
    try {
        if(parent === 'drive'){
            const drives = await Drive.find({driver:id});
            return drives;

        }else{
            const drives = await Drive.findOne({id:id});
            return drives;

        }
        
    } catch (error) {
       return({ message: 'dont connected' });
    }
};