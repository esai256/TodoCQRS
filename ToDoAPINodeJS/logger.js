module.exports = class Logger {
    constructor(logFile = `${__dirname}/todoCQRS.log`) {
        this.LogFile = logFile;
    }
    
    log(message) {
        let logMessage = `${new Date()} || Info: ${message}`;

        console.log(logMessage);

        // this.LogFile.write(logMessage);
    }

    warn(message) {
        let logMessage = `${new Date()} || Warning: ${message}`;

        console.warn(logMessage);

        // this.LogFile.write(logMessage);
    }

    error() {
        let logMessage = `${new Date()} || Error: ${message}`;

        console.error(logMessage);

        // this.LogFile.write(logMessage);
    }
};
