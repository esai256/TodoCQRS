const EventStore = require("./eventStore"/*-mongoDB*/);

/**
 * Handles Aggregates
 * @class
 * @type {Repository}
 */
module.exports = class Repository {
    /**
     * @constructor
     * @param  {EventStore} eventStore the eventStore into which the given events from aggregates should be saved into
     * @return {void}
     */
    constructor() {
        this.EventStore = new EventStore();
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
