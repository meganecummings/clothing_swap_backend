const mongoose = require('mongoose');
const DB_URL = process.env.DB_URI || 'mongodb://localhost:27017/clothingswap';

console.log(DB_URL);

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
}).then(() => console.log(`MongoDB is connected successfully at ${DB_URL}`))
.catch(error => console.log(`MongoDB connection error: ${error}`));

module.exports = {
    Event: require('./Event'),
    User: require('./User'),
    Post: require('./Post'),
    Comment: require('./Comment'),
    Item: require('./User')
}