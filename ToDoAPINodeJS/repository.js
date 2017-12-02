/**
 * Handles Aggregates
 * @class
 * @type {Repository}
 */
module.exports = class Repository {
    /**
     * @constructor
     * @param {EventStore} eventStoreClass the class of the event-store in which should be written
     * @return {void}
     */
    constructor(eventStoreClass = require("./eventStore.js")) {
        this.EventStore = new eventStoreClass();
    }

    /**
     * saves the events given in this aggregate into the given eventstore
     * @param  {Aggreate} aggregate An aggregate which contains one or more events plus some information
     * @return {Promise} resolves once the saving-operation is done successfully
     */
    save(aggregate) {
        return this.EventStore.saveAndPublish(...aggregate.Events);
    }
};
