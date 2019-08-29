const express = require('express');
const router = express.Router();

const func = require('../functions');
const checkAuth = require('../middlewares/auth.middleware');

const People = require('../models/people.model');

router.post('/', checkAuth, (req, res, next) => {
    People.find({}, (err, data) => {
        if (data.length > 0) {
            res.json(func.res(200, data.map((doc) => {
                return func.people(doc);
            })));
        } else {
            res.json(func.res(100, data));
        }
    });
});

router.post('/save', checkAuth, (req, res, next) => {
    let email = req.body.email || '';
    let phone_no = req.body.phone_no || '';
    if (email && phone_no) {
        People.findOne({
            phone_no: phone_no
        }, (err, foundPhone) => {
            if (foundPhone === null) {
                People.findOne({
                    email: email
                }, (err, foundEmail) => {
                    if (foundEmail === null) {
                        const data = new People({
                            first_name: req.body.first_name,
                            last_name: req.body.last_name,
                            email: email,
                            phone_no: phone_no,
                            gender: req.body.gender,
                            date_of_birth: req.body.date_of_birth,
                            profile_pic: req.body.profile_pic,
                            country: req.body.country,
                            address: req.body.address,
                            occupation: req.body.occupation,
                            hobbies: req.body.hobbies || '',
                            comments: req.body.comments || ''
                        });
                        data.save((err, saved) => {
                            if (saved) {
                                res.json(func.res(200, 'People saved'));
                            } else {
                                res.json(func.res(100, 'Unable to save people', err));
                            }
                        });
                    } else {
                        res.json(func.res(100, 'People with email `' + email + '` already saved', err));
                    }
                });
            } else {
                res.json(func.res(100, 'People with phone no `' + phone_no + '` already saved', err));
            }
        });
    } else {
        res.json(func.res(100, '`email` && `phone_no` are required'));
    }
});


router.post('/update', checkAuth, (req, res, next) => {
    let id = req.body.id || '';
    if (id) {
        let newData = func.newdata(req.body, ['id', 'crdate']);
        People.updateOne({
            _id: id
        }, {
            $set: newData
        }, (err, updated) => {
            if (updated) {
                res.json(func.res(200, 'People updated'));
            } else {
                res.json(func.res(100, 'Unable to update People', err));
            }
        });
    } else {
        res.json(func.res(100, '`id` is required'));
    }
});


router.post('/delete', checkAuth, (req, res, next) => {
    let id = req.body.id || '';
    if (id) {
        People.deleteOne({
            _id: id
        }, (err, deleted) => {
            if (deleted) {
                res.json(func.res(200, 'People deleted'));
            } else {
                res.json(func.res(100, 'Unable to delete People', err));
            }
        });
    } else {
        res.json(func.res(100, '`id` is required'));
    }
});

module.exports = router;