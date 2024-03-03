const mongoose = require('mongoose');
const { MONGODB } = require('./config');
const dbConfigure = `${MONGODB.DB_USERNAME}${MONGODB.DB_PASSWORD}`;
const dConnection = `${MONGODB.DB_CONNECTION}://${dbConfigure}${MONGODB.DB_HOST}${MONGODB.DB_PORT}/${MONGODB.DB_DATABASE}`;

mongoose.connect(dConnection);
console.log('dConnection: ', dConnection);
// TODO: Remove debug in production

let db = mongoose.connection;

db.once('open', () => {
    console.info('Connection Succeed');
});

db.on('error', () => {
    console.info('Error in Connect Mongo');
});

module.exports = mongoose;
