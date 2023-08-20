const User = require('../models/usersModel');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');


const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

exports.signup = async (req, res, next) => {
    let newUser;
    try {
        newUser = await User.create({
            username: req.body.username,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword
        });
    } catch (err) {

        return res.status(400).json({
            status: "Error",
            message: "Username already assigned please choose unique "

        })
    }

    const token = signToken(newUser._id);


    res.status(201).json({
        status: "Success",
        token,
        data: {
            user: newUser
        }
    })
}

exports.login = async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({
            status: "OOPS ERROR",
            message: "Please provide email and password !!"
        })
    }
    const user = await User.findOne({ username }).select('+password');

    if (!user || ! await user.correctPassword(password, user.password)) {

        console.log(user.correctPassword(password, user.password));
        res.status(401).json({
            status: "Failed",
            message: "incorrect username or password"
        })
    }
    const token = signToken(user._id)

    res.status(200).json({
        status: "Success",
        token,
        loggedIN: user._id
    })
}

exports.protectRoutes = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(" ")[1];
        console.log(token);
    }
    if (!token) {
        return res.status(401).json({
            status: "Failed",
            message: "Unauthorized access"
        });
    };
    try {
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    }
    catch (err) {
        return res.status(401).json({
            status: "Error",
            message: "Invalid token "
        })
    }

    next();
}
