const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxlength: 200,
        minlength: 3
    },
    content: {
        type: String,
        required: true,
        maxlength: 500
    },
    user: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    date_commented: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Comment', CommentSchema);