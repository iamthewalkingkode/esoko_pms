const jwt = require('jsonwebtoken');
const conf = require('../config');
const bcrypt = require('bcrypt');
const express = require('express');

const func = require('../functions');
const Users = require('../models/users.model');

const router = express.Router();

router.post('/', (req, res) => {
    let username = req.body.username || '';
    let password = req.body.password || '';
    if (username && password) {
        Users.findOne({
            username: username
        }, 'username password', function (err, user) {
            if (user) {
                bcrypt.compare(username + conf.pepper + password, user.password, (err, hash) => {
                    if (hash === true) {
                        jwt.sign(user.toJSON(), conf.pepper, {
                            expiresIn: conf.jwtExpiresIn
                        }, (jwterr, jwtoken) => {
                            if (jwtoken) {
                                res.json({
                                    status: 200,
                                    result: user,
                                    token: jwtoken
                                });
                            } else {
                                res.json(func.res(100, '30: Authentication failed', jwterr));
                            }
                        });
                    } else {
                        res.json(func.res(100, '34: Authentication failed', err));
                    }
                });
            } else {
                res.json(func.res(100, '38: Authentication failed'));
            }
        });
    } else {
        res.json(func.res(100, '`username` && `password` are required'));
    }
});


router.post('/register', (req, res) => {
    let username = req.body.username || '';
    let password = req.body.password || '';
    let password2 = req.body.password2 || '';
    if(username && password && password2) {
        if (password === password2) {
            if (func.strongPWD(password) === true) {
                Users.findOne({
                    username: username
                }, function (err, checker) {
                    if (checker === null) {
                        bcrypt.hash(username + conf.pepper + password, 10, (err, hash) => {
                            const user = new Users({
                                username: username,
                                password: hash
                            });
                            user.save((err, user) => {
                                if (user) {
                                    res.json(func.res(200, 'User registered'));
                                } else {
                                    res.json(func.res(100, 'Unable to save user', err));
                                }
                            });
                        });
                    } else {
                        res.json(func.res(100, 'User with username address `' + username + '` has already been registered'));
                    }
                });
            } else {
                res.json(func.res(100, 'Password must be 8 characters long and contain both letters (a-Z), numbers (0-9) and a symbol (!@#$%^&*])'));
            }
        } else {
            res.json(func.res(100, 'Passwords do not match'));
        }
    }else{
        res.json(func.res(100, '`username`, `password` && `password2` are required'));
    }
});

module.exports = router;