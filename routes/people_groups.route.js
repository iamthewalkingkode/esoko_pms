const express = require('express');
const router = express.Router();

const func = require('../functions');
const checkAuth = require('../middlewares/auth.middleware');
const Groups = require('../models/groups.model');
const People = require('../models/people.model');
const People_Groups = require('../models/people_groups.model');

router.post('/', checkAuth, (req, res, next) => {
    People_Groups.find({}, (err, data) => {
        if (data.length > 0) {
            res.json(func.res(200, data));
        } else {
            res.json(func.res(100, data));
        }
    }).populate('group', 'name').populate('people');
});

router.post('/assign', checkAuth, (req, res, next) => {
    let group = req.body.group || '';
    let people = req.body.people || '';
    if (group && people) {
        Groups.findById(group, (err, foundGroup) => {
            if (foundGroup) {
                People.findById(people, (err, foundPeople) => {
                    if (foundPeople) {
                        People_Groups.findOne({
                            group: group,
                            people: people
                        }, (err, foundAssign) => {
                            if (foundAssign === null) {
                                const data = new People_Groups({
                                    group: group,
                                    people: people
                                });
                                data.save((err, saved) => {
                                    if (saved) {
                                        res.json(func.res(200, 'Assigmant saved'));
                                    } else {
                                        res.json(func.res(100, 'Unable to save Assigmant', err));
                                    }
                                });
                            } else {
                                res.json(func.res(100, 'People has already been assigned to this group'));
                            }
                        });
                    } else {
                        res.json(func.res(100, 'People not found'));
                    }
                });
            } else {
                res.json(func.res(100, 'Group not found'));
            }
        });
    } else {
        res.json(func.res(100, '`group` && `people` is required'));
    }
});

module.exports = router;