const validate = (validator) => {
    return async function (req, res, next) {
        try {
            await validator.validateAsync(req.body);
            next();
        } catch (err) {
            if (err.isJoi) return res.send({ message: err.message });
            return res.send({ message: err.message });
        }
    };
};

module.exports = validate;
