const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    content: {
        type: String,
        required: true,
        maxlength: 500
    },
    user_id: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    post_id: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post',
        }
    ], 
    date_commented: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Comment', CommentSchema);