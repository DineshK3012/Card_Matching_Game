const User = require('../models/user');
const jwt = require("jsonwebtoken");

exports.isAuthenticated = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Please login first"
            });
        }

        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded._id).select("_id username email bestScore");

        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
