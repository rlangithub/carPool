const jwt = require('jsonwebtoken');

const jwtMiddleware = (req, res, next) => {

    const token = req.headers['authorization'];
    if (token) {
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'אימות נכשל: טוקן לא תקין' });
            } else {
                req.user = decoded;
                next();
            }
        });
    } else {
        return res.status(401).json({ error: 'לא סופק טוקן בכותרת הבקשה' });
    }
};




module.exports = jwtMiddleware;