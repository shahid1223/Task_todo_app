const appError = require('../utils/appError')

const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new appError(message, 400, 400)
};

const sendDevError = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        code: err.statusCode,
        stack: err.stack,
        error: err
    })
};

const sendProdError = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            code: err.statusCode
        });
    } else {
        console.error('ERROR ', err);
        res.status(500).json({ status: 'error', message: "Something went very wrong", code: 500 })
    }
};

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    let error = { ...err };
    if (error.name === 'CastError') error = handleCastErrorDB(err);
    sendProdError(error, res);
}