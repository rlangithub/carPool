const jwt = require('jsonwebtoken');
exports.generateToken =(driverID, driverPassword)=> {
    console.log("driverID",driverID);
    const payload = {
        ID: driverID,
        password: driverPassword
    };
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '10m' });
    return token;
}