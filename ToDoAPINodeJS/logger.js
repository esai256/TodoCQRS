const fs = require("fs");

module.exports = class Logger
{
    constructor(logFileName = `${__dirname}/todoCQRS.log`)
    {
        this.logFileName = logFileName;
    }

    test() {
        this.log("test1");
        this.warn("test2");
        this.error("test3");
    }

    log(message)
    {
        let logMessage = `${getCurrentTimeStamp()}\t || Info    ||\t ${message}\n`;

        console.log(logMessage);

        fs.appendFile(this.logFileName, logMessage, error => error ? console.error(`Could not write to the logs! ${error}`) : undefined);
    }

    warn(message)
    {
        let logMessage = `${getCurrentTimeStamp()}\t || Warning ||\t ${message}\n`;

        console.warn(logMessage);

        fs.appendFile(this.logFileName, logMessage, error => error ? console.error(`Could not write to the logs! ${error}`) : undefined);
    }

    error(message)
    {
        let logMessage = `${getCurrentTimeStamp()}\t || Error   ||\t ${message}\n`;

        console.error(logMessage);

        fs.appendFile(this.logFileName, logMessage, error => error ? console.error(`Could not write to the logs! ${error}`) : undefined);
    }
};

function getCurrentTimeStamp(date = new Date(Date.now()))
{
    const monthOffset = 1;

    return `${date.getFullYear()}-${date.getMonth()+monthOffset}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}`;
}
