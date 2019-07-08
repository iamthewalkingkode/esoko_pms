const conf = require('./config');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const authRoutes = require('./routes/auth.route');
const peopleRoutes = require('./routes/people.route');
const groupsRoutes = require('./routes/groups.route');
const peopleGroupsRoutes = require('./routes/people_groups.route');


const app = express();
mongoose.connect(conf.database, {
    useNewUrlParser: true
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());



// CORS handling
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'POST');
    next();
});


// Routes handling
app.use('/auth', authRoutes);
app.use('/people', peopleRoutes);
app.use('/groups', groupsRoutes);
app.use('/people_groups', peopleGroupsRoutes);


// Default error handlers
app.use((req, res, next) => {
    const error = new Error('Invalid `request`!!');
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.json({
        status: error.status || 404,
        result: error.message
    });
});


module.exports = app;