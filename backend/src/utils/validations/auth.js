const joi = require('joi');

const signup = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    isAdmin: joi.boolean().required(),
})

const signin = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
})

module.exports = {
    signup,
    signin
}