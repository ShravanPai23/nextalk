import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import createTokenAndSaveCookie from "../jwt/generateToken.js";

export const signup = async(req, res) => {
    try {
        console.log("Received signup request body:", req.body);

        const { username, email, password, confirmPassword } = req.body;

        if (!username || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required." });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match!" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists!" });
        }

        const existingUsername = await User.findOne({ name: username });
        if (existingUsername) {
            return res.status(400).json({ message: "Username already taken!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name: username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        createTokenAndSaveCookie(newUser._id, res);

        res.status(201).json({
            message: "User registered successfully!",
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            }
        });

    } catch (error) {
        console.error("Signup error:", error);
        if (error.code === 11000) {
            return res.status(400).json({ message: "A user with that email or username already exists." });
        }
        res.status(500).json({ message: "Server error during signup." });
    }
};

export const login = async(req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "Invalid email or password." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(404).json({ message: "Invalid email or password." });
        }

        createTokenAndSaveCookie(user._id, res);
        res.status(200).json({
            message: "User logged in successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            },
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error during login." });
    }
};

export const logout = async(req, res) => {
    try {
        res.clearCookie('jwt');
        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ message: "Server error during logout." });
    }
};

export const getAllUserProfile = async(req, res) => {
    try {
        const loggedInUser = req.User._id;
        const allUsers = await User.find({ _id: { $ne: loggedInUser } }).select("-password");
        res.status(200).json({ allUsers });
    } catch (error) {
        console.error("Error in getAllUserProfile controller:", error);
        res.status(500).json({ message: "Server error" });
    }
};
