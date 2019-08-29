const jwt = require('jsonwebtoken');
const conf = require('../config');

module.exports = (req, res, next) => {
    let token = req.headers.hasOwnProperty('authorization') ? req.headers.authorization.split(' ')[1] : '';
    jwt.verify(token, conf.pepper, function (err, verify) {
        if(err === null) {
            req.logg = verify;
        }else{
            req.logg = {};
            return res.json({
                status: 300,
                result: 'Authentication failed...'
            });
        }
    });
    next();
};