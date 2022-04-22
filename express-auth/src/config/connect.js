const mongoose = require('mongoose');
const logEvents = require('../helpers/logEvents');
const connect = mongoose.createConnection(process.env.MONGODB_URI, {
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
process.on('SIGINT', async () => {
    console.log("You are performing a server shutdown!")
    await connect.close();
    process.exit(0);
})

module.exports = connect;