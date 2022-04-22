const mongoose = require('mongoose');
const logEvents = require('../helpers/logEvents');
function newConnection(uri) {
    const connect = mongoose.createConnection(uri, {
        autoIndex: false,
        serverSelectionTimeoutMS: 5000
    })
    connect.on('connected', () => {
        console.log("Connected MongoDB..........");
    })
    connect.on('disconnected', () => {
        console.log("Disconnected MongoDB..........");
    })
    connect.on('error', async (error) => {
        console.log(error.message);
        console.log("Connected MongoDB error..........");
        await logEvents(error.message);
        process.exit(1);
    })
    connect.on('reconnectFailed', async (error) => {
        console.log(error.message);
        console.log("ReconnectFailed MongoDB..........");
        await logEvents(error.message);
        process.exit(1);
    })
    return connect;
}

const connectDBOne = newConnection('mongodb://localhost:27017/test');
const connectDBUser = newConnection('mongodb://localhost:27017/test2');

module.exports = {connectDBOne, connectDBUser};