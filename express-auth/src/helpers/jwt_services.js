const jwt = require('jsonwebtoken');
const generateAccessToken = async (userId) => {
    return new Promise((resolve, reject) => {
        const data = {
            userId
        }
        const key = process.env.ACCESS_TOKEN_SECRET
        const options = {
            expiresIn: '60m'
        }
        jwt.sign(data, key, options, (err, token) => {
            if (err) return reject(err);
            // console.log(token);
            resolve(token);
        })

    })
}
const generateRefreshToken = async (userId) => {
    return new Promise((resolve, reject) => {
        const data = {
            userId
        }
        const key = process.env.REFRESH_TOKEN_SECRET
        const options = {
            expiresIn: '365d'
        }
        jwt.sign(data, key, options, (err, refreshToken) => {
            if (err) return reject(err);
            // console.log(token);
            resolve(refreshToken);
        })

    })
}
module.exports = {generateAccessToken, generateRefreshToken}