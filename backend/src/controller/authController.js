const authService = require('../services/auth');

const registerUser = catchAsync(async (req, res) => {
    const result = await authService.registerUser(req);
    if (result) {
        return res.status(201).send({ message: 'User created Successfully', data: result });
    }
    return res.status(422).send({ message: 'User creation failed', data: {} });
})

const logIn = catchAsync(async (req, res) => {
    const result = await authService.logIn(req);
    if (result) {
        return res.status(200).send({ message: 'Login Successfully', data: result });
    }
    return res.status(401).send({ message: 'Login failed', data: {} });
})

module.exports = {
    registerUser,
    logIn
}