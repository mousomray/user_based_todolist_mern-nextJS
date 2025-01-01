const UserModel = require('../model/user') // Our user Model
const { comparePassword } = require('../middleware/auth') // Came from middleware folder
const jwt = require('jsonwebtoken'); // For to add token in header
const bcrypt = require('bcryptjs'); // For hashing password

class AuthController {

    // Handle Register
    async register(req, res) {
        try {
            const existingUser = await UserModel.findOne({ email: req.body.email });
            if (existingUser) {
                return res.status(400).json({
                    message: "Validation error",
                    errors: ["User already exists with this email"]
                });
            }
            if (!req.body.password) {
                return res.status(400).json({
                    message: "Validation error",
                    errors: ["Password is required"]
                });
            }
            if (req.body.password.length < 8) {
                return res.status(400).json({
                    message: "Validation error",
                    errors: ["Password should be at least 8 characters long"]
                });
            }
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            const user = new UserModel({
                ...req.body, password: hashedPassword
            });
            const savedUser = await user.save();
            res.status(201).json({
                success: true,
                message: "Registration successfully",
                user: savedUser
            })
        } catch (error) {
            const statusCode = error.name === 'ValidationError' ? 400 : 500;
            const message = error.name === 'ValidationError'
                ? { message: "Validation error", errors: Object.values(error.errors).map(err => err.message) }
                : { message: "An unexpected error occurred" };
            console.error(error);
            res.status(statusCode).json(message);
        }
    }

    // Handle Login
    async login(req, res) {
        try {
            const { email, password } = req.body
            if (!email || !password) {
                return res.status(400).json({
                    message: "All fields are required"
                })
            }
            const user = await UserModel.findOne({ email })
            if (!user) {
                return res.status(400).json({
                    message: "User not found"
                })
            }
            const isMatch = comparePassword(password, user.password)
            if (!isMatch) {
                return res.status(400).json({
                    message: "Invalid credentials"
                })
            }
            const token = jwt.sign({
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                city: user.city,
                address: user.address
            }, process.env.API_KEY,
                { expiresIn: "1d" })
            res.status(200).json({
                success: true,
                message: "User login successfully",
                data: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    city: user.city,
                    address: user.address
                },
                token: token
            })
        } catch (error) {
            console.log(error);

        }

    }

    // Fetching Dashboard Data 
    async dashboard(req, res) {
        try {
            const user = req.user;
            if (!user) {
                return res.status(401).json({ message: "Unauthorized access. No user information found." });
            }
            console.log("User Data:", user);
            res.status(200).json({
                message: "Welcome to the user dashboard",
                user: user
            });
        } catch (error) {
            console.error("Server Error:", error.message);
            res.status(500).json({ message: "Server error" });
        }
    };
}
module.exports = new AuthController()








