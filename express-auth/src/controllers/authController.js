const User = require('../models/User');
const logEvents = require('../helpers/logEvents');
const bcrypt = require('bcrypt');
const authController = {
    register: async (req, res) => {
        const {username, password} = req.body
        if (!username || !password) return res.status(400).json('Missing username or password!');

        try {
            const user = await User.findOne({ username: username });
            if (user) return res.status(400).json('Username already taken!');
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(password, salt);
            const newUser = new User({
                username,
                password: hashed
            })
            await newUser.save();
            return res.status(200).json(newUser);
        } catch (error) {
            await logEvents(error.message);
            return res.status(500).json(error.message);
        }
    },
    login: async (req, res) => {
        res.json("Login function");
    },
    refreshToken: async (req, res) => {
        res.json("Refresh token function");
    },
    logout: async (req, res) => {
        res.json("Logout function");
    }
}
module.exports = authController