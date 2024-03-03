const express = require('express');
require('./src/config/db');
const cors = require('cors');
const app = express();
const { catchAsync } = require('./src/utils/helper');

global.catchAsync = catchAsync;
global.validate = require('./src/middleware/validate');

const corsOptions = {
    origin: ['http://localhost:1234'],
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Accept',
        'Content-Type',
        'Authorization',
        'x-verification-signature',
    ],
    methods: ['OPTIONS', 'GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', require('./src/routes'));

module.exports = app;