const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const logEvents = require('../helpers/logEvents');
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

//use connect multiple db
// const {connectDBUser} = require('../config/connectMultipleDB');
// const User = connectDBUser.model('User', userSchema);

//Use bcrypt hashed password
// userSchema.pre('save', async function (next) {
//     try {
//         const salt = await bcrypt.genSalt(10);
//         const hashed = await bcrypt.hash(this.password, salt);
//         this.password = hashed;
//         next();
//     } catch (error) {
//         console.error(error.message);
//         await logEvents(error.message, module.filename);
//     }
// })

const User = mongoose.model('User', userSchema);

module.exports = User;