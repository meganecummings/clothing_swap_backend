const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    brand: {
        type: String
    },
    size: {
        type: Array
    },
    category: {
        type: String
    },
    description: {
        type: String
    },
    date_created: {
        type: Date,
        default: Date.now
    },
    image: {
        type: String
    },
    slug: {
        type: String
    }
})