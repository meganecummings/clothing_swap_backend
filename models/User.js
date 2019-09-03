const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const defaultImage = require('../avataar_default.png');

const UserSchema = new Schema({
    username: {
        type: String, 
        unique: true,
        required: true, 
        maxlength: 30
    }, 
    password: {
        type: String,
        required: true,
        minlength: 3
    },
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    date_joined: {
        type: Date,
        default: Date.now
    },
    email: {
        type: String, 
        unique: true,
        required: true
    },
    photo: {
        type: String,
        default: defaultImage
    },
    size: {
        type: Array
    },
    phone_number: {
        type: String,
        unique: true
    },
    slug: {

    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;