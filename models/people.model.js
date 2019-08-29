const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const _Schema = Schema({
    first_name: {
        type: String,
        required: [true, '`first_name` is required']
    },
    last_name: {
        type: String,
        required: [true, '`last_name` is required']
    },
    email: {
        type: String,
        required: [true, '`email` is required']
    },
    phone_no: {
        type: Number,
        required: [true, '`phone_no` is required']
    },
    gender: {
        type: String,
        enum: ['Male', 'Female']
    },
    date_of_birth: {
        type: Date,
        default: '1970-01-01'
    },
    profile_pic: {
        type: String,
        default: 'avatar.png'
    },
    country: {
        type: String,
        default: 'GH'
    },
    address: {
        type: String,
        required: [true, '`address` is required']
    },
    occupation: {
        type: String,
        required: [true, '`occupation` is required']
    },
    hobbies: {
        type: String
    },
    comments: {
        type: String
    },
    crdate: {
        type: Date,
        defuatl: Date.now
    }
});

module.exports = mongoose.model('People', _Schema);