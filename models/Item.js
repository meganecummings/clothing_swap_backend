const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    user_id: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    ], 
    name: {
        type: String
    },
    brand: {
        type: String
    },
    size: {
        type: String
    },
    category: {
        type: String
    },
    description: {
        type: String
    },
    quality: {
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
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    ]
})