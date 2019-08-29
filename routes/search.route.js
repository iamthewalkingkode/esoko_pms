const express = require('express');
const router = express.Router();

const func = require('../functions');
const checkAuth = require('../middlewares/auth.middleware');

const People = require('../models/people.model');

router.post('/', checkAuth, (req, res, next) => {
    People.find(func.like(req.body, ['phone_no', 'email']), (err, data) => {
        if (data && data.length > 0) {
            res.json(func.res(200, data.map((doc) => {
                return func.people(doc);
            })));
        } else {
            res.json(func.res(100, []));
        }
    });
});

module.exports = router;