const jwt = require('jsonwebtoken');
const testVerifyToken = (req, res, next) => {
    const token = req.headers.authorization
    // console.log(req.headers.authorization);
    const accessToken = token.split(" ")[1];
    if(!token) return res.status(401).json("Token not found");
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
        if (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json('jwt expired')
            }
            return res.status(401).json(error.name);
        }
        req.userId = decoded.userId
        next();
    })
}

module.exports = testVerifyToken;