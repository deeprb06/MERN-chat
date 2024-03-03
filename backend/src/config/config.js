require('dotenv').config();

module.exports = {
    SERVER: {
        PORT: process.env.PORT || 4001
    },
    MONGODB: {
        DB_CONNECTION: process.env.DB_CONNECTION || 'mongodb',
        DB_HOST: process.env.DB_HOST || 'localhost',
        DB_PORT:
            process.env.DB_PORT == ''
                ? process.env.DB_PORT
                : process.env.DB_PORT
                ? `:${process.env.DB_PORT}`
                : `:27017`,
        DB_DATABASE: process.env.DB_DATABASE || 'webchat',
        DB_USERNAME: process.env.DB_USERNAME
            ? `${process.env.DB_USERNAME}:`
            : '',
        DB_PASSWORD: process.env.DB_PASSWORD
            ? `${process.env.DB_PASSWORD}@`
            : '',
    },
    AUTH: {
        JWT_SECRET: process.env.JWT_SECRET ?? 'thisismysecret',
        JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET ?? 'thisismyrefreshtokensecret'
    },
}