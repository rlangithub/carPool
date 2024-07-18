const jwt = require('jsonwebtoken');

exports.jwtMiddleware = (token) => {
    let res = false;
    console.log('token',token);
    // const token = req.headers['authorization'];
    if (token) {
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
                res = false;
                // return res.status(401).json({ error: 'אימות נכשל: טוקן לא תקין' });
                console.log('false');
                // res.json('false');
            } else {
                res= true;
                console.log('true');
                // res.json('true');
                // req.user = decoded;
                // next();
            }
        });
        return res;
    } 
    // else {
    //     return res.status(401).json({ error: 'לא סופק טוקן בכותרת הבקשה' });
    // }
};
