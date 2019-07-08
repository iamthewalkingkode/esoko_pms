const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const _Schema = Schema({
    name: {
        type: String,
        required: [true, '`name` is required']
    },
    crdate: {
        type: Date,
        defuatl: Date.now
    }
});

module.exports = mongoose.model('Groups', _Schema);