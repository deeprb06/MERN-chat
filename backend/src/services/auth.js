const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { AUTH } = require('../config/config');

const generateToken = (user, secret = AUTH.JWT_SECRET, expires = '1h') => {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
        },
        secret,
        {
            expiresIn: expires,
        },
    );
};

const registerUser = async (req) => {
    try {
        const existinguser = await User.findOne({ email: req.body.email });
        if (existinguser) {
            return false
        }
        return User.create(req.body);
    } catch (error) {
        console.log('error: ', error);
    }
}

const logIn = async (req) => {
    try {
        const existinguser = await User.findOne({ email: req.body.email });
        if (!existinguser) {
            return false
        }
        const matchpassword = await existinguser.comparePassword(req.body.password);
        if (!matchpassword) {
            return false;
        }
        delete existinguser._doc.password;
        return {
            ...existinguser._doc,
            token: generateToken(existinguser),
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

module.exports = {
    registerUser,
    logIn
}