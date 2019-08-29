const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const _Schema = Schema({
    username: {
        type: String,
        required: [true, '`username` is required']
    },
    password: {
        type: String,
        required: [true, '`password` is required']
    },
    crdate: {
        type: Date,
        defuatl: Date.now
    }
});

module.exports = mongoose.model('Users', _Schema);