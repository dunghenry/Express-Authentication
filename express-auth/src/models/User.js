const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})
const User = mongoose.model('User', userSchema);

//use connect multiple db
// const {connectDBUser} = require('../config/connectMultipleDB');
// const User = connectDBUser.model('User', userSchema);

module.exports = User;