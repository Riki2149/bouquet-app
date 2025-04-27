import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
    let token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            title: "Unauthorized",
            message: "Token is required to access this resource."
        });
    }
    try {
        let result = jwt.verify(token, process.env.SECRET_KEY);
        req.user = result;
        next();
    } catch (err) {
        return res.status(403).json({
            title: "Token Error",
            message: `Invalid token: ${err.message}`
        });
    }
}

export function checkAdmin(req, res, next) {
    verifyToken(req, res, () => {
        if (req.user.role !== "Admin") {
            return res.status(403).json({
                title: "Access Denied",
                message: "You need admin privileges to access this resource. Please contact an administrator if you believe this is an error."
            });
        }
        next();
    });
}
