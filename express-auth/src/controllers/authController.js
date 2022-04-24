const User = require('../models/User');
const logEvents = require('../helpers/logEvents');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { userValidation } = require('../helpers/validation');
const { generateAccessToken, generateRefreshToken } = require('../helpers/jwt_services');
const authController = {
    register: async (req, res) => {
        const { username, password } = req.body;
        const { error, value } = userValidation(req.body);
        console.log("Error : " + error);
        console.log("Value : " + JSON.stringify(value));
        if (error) {
            await logEvents(error.message, module.filename);
            return res.status(400).json("Invalid username or password!!")
        }
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
            // const newUser = new User({
            //     username,
            //     password: req.body.password
            // })
            await newUser.save();
            return res.status(200).json(newUser);
        } catch (error) {
            await logEvents(error.message, module.filename);
            return res.status(500).json(error.message);
        }
    },
    generateAccessToken: (user) => {
        return jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60m' });
    },
    generateRefreshToken: (user) => {
        return jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '365d' });
    },
    login: async (req, res) => {
        if (!req.body.username || !req.body.password) return res.status(400).json('Missing username or password!');
        try {
            const user = await User.findOne({ username: req.body.username });
            if (!user) return res.status(404).json('User is incorrect!');
            const passwordValid = await bcrypt.compare(req.body.password, user.password);
            // console.log(passwordValid); //true or false
            if (!passwordValid) return res.status(404).json('Password is incorrect!');
            const { password, ...infoUser } = user._doc;
            // console.log(user._doc);
            const token = authController.generateAccessToken(user);
            // const testAccessToken = await generateAccessToken(user._id);
            // const testRefreshToken = await generateRefreshToken(user._id)
            const refreshToken = authController.generateRefreshToken(user);
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict",
            });
            if (user && passwordValid) return res.status(200).json({ ...infoUser, token});
        } catch (error) {
            await logEvents(error.message, module.filename);
            return res.status(500).json(error.message);
        }
    },
    refreshToken: async (req, res) => {
        const refreshToken = req.cookies.refreshToken;
        // console.log(req.cookies.refreshToken)
        if (!refreshToken || req.cookies.refreshToken === undefined) return res.status(401).json("You're not authenticated");
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
            if (err) {
                console.error(err.message);
            }
            const user = {
                '_id' : data.userId
            }
            const newAccessToken = authController.generateAccessToken(user);
            const newRefreshToken = authController.generateRefreshToken(user)
            res.cookie("refreshToken", newRefreshToken, {
                httpOnly: true,
                secure:false,
                path: "/",
                sameSite: "strict",
            });
            return res.status(200).json({newAccessToken})
        })
    },
    logout: async (req, res) => {
        res.clearCookie("refreshToken");
        return res.status(200).json("Logged out successfully!");
    }
}
module.exports = authController;