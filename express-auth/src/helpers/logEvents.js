const fs = require('fs').promises;
const { format } = require('date-fns');
const path = require('path');
const fileName = path.join(__dirname, '../logs', 'logs.log');
const logEvents = async (msg) => {
    const dateTime = `${format(new Date(), 'dd-MM-yyyy\tss:mm:HH')}`;
    const contentLog = `${dateTime} - ${msg}\n`;
    try {
       await fs.appendFile(fileName, contentLog);
    } catch (error) {
        console.log(error);
    }
}

module.exports = logEvents;