const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Comment = require('./Comment');

const PostSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        maxlength: 200,
        minlength: 1
    },
    content: {
        type: String,
        required: true,
        maxlength: 1000
    },
    event_slug: {
        type: String,
        required: true
    },
    date_created: {
        type: Date,
        default: Date.now
    },
    comments: [Comment.schema]
});

module.exports = mongoose.model('Post', PostSchema);
