const JWT = require('jsonwebtoken');
const { JWT_SECRATE } = require('../config/serverConfig');



async function isLoggedIn(req, res, next) {
    const token = req.cookies["authToken"];

    if (!token) {
        return res.status(401).json({
            success: false,
            data: {},
            error: "Not authenticated",
            message: "No auth provided"
        });
    }

    const decoded = JWT.verify(token, JWT_SECRATE);

    if (!decoded) {
        return res.status(401).json({
            success: false,
            data: {},
            error: "Not authenticated",
            message: "No auth provided"
        });
    }

    req.user = {
        email: decoded.email,
        id: decoded.id
    }

    next();
}


module.exports = {
    isLoggedIn
}