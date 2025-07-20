import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const authenticate = async(req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) return res.status(401).json({ message: "No token found" });

        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        const user = await User.findById(decoded.userId).select("-password");

        if (!user) return res.status(401).json({ message: "User not found" });

        req.User = user;
        next();
    } catch (err) {
        console.error("JWT Error:", err);
        return res.status(401).json({ message: "Unauthorized" });
    }
};

export default authenticate;