const express = require('express');
const router = express.Router();

const func = require('../functions');
const checkAuth = require('../middlewares/auth.middleware');
const Groups = require('../models/groups.model');

router.post('/', checkAuth, (req, res, next) => {
    Groups.find({}, (err, data) => {
        if (data.length > 0) {
            res.json(func.res(200, data));
        } else {
            res.json(func.res(100, data));
        }
    });
});

router.post('/save', checkAuth, (req, res, next) => {
    let name = req.body.name || '';
    if(name) {
        Groups.findOne({
            name: name
        }, (err, found) => {
            if(found === null) {
                const data = new Groups({
                    name: name
                });
                data.save((err, saved) => {
                    if (saved) {
                        res.json(func.res(200, 'Group saved'));
                    } else {
                        res.json(func.res(100, 'Unable to save Group', err));
                    }
                });
            }else{
                res.json(func.res(100, '`' + name +'` has already been saved'));
            }
        });
    }else{
        res.json(func.res(100, '`name` is required'));
    }
});

router.post('/update', checkAuth, (req, res, next) => {
    let id = req.body.id || '';
    let name = req.body.name || '';
    if (id && name) {
        let newData = func.newdata(req.body, ['id']);
        Groups.updateOne({
            _id: id
        }, {
            $set: newData
        }, (err, updated) => {
            if (updated) {
                res.json(func.res(200, 'Group updated'));
            } else {
                res.json(func.res(100, 'Unable to update group', err));
            }
        });
    } else {
        res.json(func.res(100, '`id` && `name` are required'));
    }
});

module.exports = router;