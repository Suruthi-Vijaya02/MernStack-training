const jwt = require("jsonwebtoken");

const adminAuth = async (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Authorization header not found",
            });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token not found",
            });
        }

        const decoded = jwt.verify(token, "secret_key");

        if (decoded.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Access denied. Admin only.",
            });
        }

        req.user = decoded;

        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Invalid token",
        });
    }
};

module.exports = { adminAuth };