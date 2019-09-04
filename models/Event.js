const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');

const EventSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
    },
    start_time: {
        type: String, 
        required: true
    },
    end_time: {
        type: String
    }, 
    posts: {
        type: Array
    },
    cancelled: {
        type: Boolean,
        default: false
    },
    cancelled_at: {
        type: Date
    },
    items: {
        type: Array
    },
    attendees: [User.schema],
    slug: {
        type: String
    }
});

module.exports = mongoose.model('Event', EventSchema);
