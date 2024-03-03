const responseCode = require('./responseCode');

const catchAsync = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
        res.status(responseCode.validationError).json({
            message: (err.message),
        });
    });
};

module.exports = {
    catchAsync
};