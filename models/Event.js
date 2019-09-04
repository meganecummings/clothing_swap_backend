const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    date_created: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String
    }
});

