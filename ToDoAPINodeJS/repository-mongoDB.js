const RepositoryBase = require("./repository.js");
const EventStoreMongoDB = require("./eventStore-mongoDB");

/**
 * Handles Aggregates
 * @class
 * @type {RepositoryMongoDB}
 */
module.exports = class RepositoryMongoDB extends RepositoryBase {
    /**
     * @constructor
     * @return {void}
     */
    constructor() {
        super(EventStoreMongoDB);
    }
};
