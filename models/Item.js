const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    user: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    ], 
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