const { Schema, model } = require('mongoose');
const { USER } = require('../config/constants/common');
const bcrypt = require('bcrypt');

const schema = new Schema(
    {
        name: { type: 'String', required: true },
        email: { type: 'String', unique: true, required: true },
        password: { type: 'String', required: true },
        pic: {
            type: 'String',
            required: true,
            default: USER.DEFAULT_PROFILE,
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    { timestaps: true },
);

schema.pre('save', function (next) {
    bcrypt.hash(this.password, 10, (error, hash) => {
        if (error) {
            return next(error);
        } else {
            this.password = hash;
            next();
        }
    });
});

schema.methods.comparePassword = async function (passw) {
    return bcrypt.compare(passw, this.password);
};

const user = model('user', schema, 'user');

module.exports = user;
