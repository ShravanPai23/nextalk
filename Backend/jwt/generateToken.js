import jwt from "jsonwebtoken";

const createTokenAndSaveCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_TOKEN, {
        expiresIn: "5d",
    });

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: false, 
        sameSite: "Lax", 
        maxAge: 5 * 24 * 60 * 60 * 1000,
    });
};

export default createTokenAndSaveCookie;