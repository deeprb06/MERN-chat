const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/user');

const authentication = async (req, res, next) => {
    try {
        const token = req.headers['authorization'];

        if (!token) {
            return res.status(401).send({ message: 'unAuthenticated' });
        }

        const decoded = jwt.verify(token, config.AUTH.JWT_SECRET);

        const findUser = await User.findOne({ email: decoded.email });

        if (!findUser) {
            return res.status(404).send({ message: 'User not found' });
        }
        req.userId = findUser.id;
        req.user = findUser;

        next();
    } catch (error) {
        return res.status(401).send({ message: 'unAuthenticated' });
    }
};


module.exports = {
    authentication
}