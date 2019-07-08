const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const _Schema = Schema({
    people: {
        type: Schema.Types.ObjectId,
        ref: 'People',
        required: [true, '`people` is required']
    },
    group: {
        type: Schema.Types.ObjectId,
        ref: 'Groups',
        required: [true, '`group` is required']
    },
    crdate: {
        type: Date,
        defuatl: Date.now
    }
});

module.exports = mongoose.model('People_Groups', _Schema);