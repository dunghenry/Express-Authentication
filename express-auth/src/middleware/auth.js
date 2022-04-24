const jwt = require('jsonwebtoken');
const logEvents = require('../helpers/logEvents');
const verifyToken = async (req, res, next) => {
    // console.log(req.headers); 'Bearer accessToken'
    const token = req.headers.token;
    if (token) {
        const accessToken = token.split(" ")[1]; //["Bearer", "accessToken"];
        try {
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET); //Giai ma token
            req.userId = decoded.userId;
            next();
        } catch (error) {
            if(error.name === 'TokenExpiredError') return res.json("jwt expired")
            await logEvents(error.message, module.filename);
            console.log(error.message);
            res.status(403).json({ message: "Token is not valid!"});
        }
    }
    else {
        await logEvents("Token not found!", module.filename);
        return res.status(401).json({ message: "Token not found!" });
    }
}
const verifyAccessToken = (req, res, next) => {
    
}

module.exports = {verifyToken};