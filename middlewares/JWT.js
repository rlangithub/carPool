const jwt = require('jsonwebtoken');
const { generateToken } = require('../services/jwt')

exports.jwtMiddleware = (token, driver) => {
    let res = false;
    if (token) {
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
                res = false;
            } else {
                res = true;
            }
        });
        return res ;
    }
    // else {
    //     return res.status(401).json({ error: 'לא סופק טוקן בכותרת הבקשה' });
    // }
};
