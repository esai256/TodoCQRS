const Bus = require("./bus");

/**
 * This class saves events to a given EventStore and forwards it to a bus
 * @class
 * @type {EventStore}
 */
module.exports = class EventStore
{
    /**
     * saves and publishes the events. It saves the events to the eventStore and publishes them to the given bus
     * @param  {Array} events the events which should be handled
     * @return {Promise} resolves once the saving- and publishing-operations are done successfully
     */
    saveAndPublish(events)
    {
        return new Promise((resolve, reject) =>
        {
            this.save(events).then(() =>
            {
                this.publish(events).then(() =>
                {
                    resolve();
                }, err => reject(err));
            }, err => reject(err));
        });
    }

    /**
     * publishes events to the bus, which handles it afterwards
     * @param  {Array} events the events which should be published
     * @return {Promise} resolves once the publishing-operations are done successfully
     */
    publish(events)
    {
        return new Promise(resolve =>
        {
            let counter = 0;

            events.forEach(event =>
            {
                counter++;

                Bus.publish(event.Symbol, event);

                if (counter == events.length)
                {
                    resolve();
                }
            });
        });
    }

    /**
     * Saves the events to a given event-store. Should be implemented in an inheriting class, as this implementation does nothing.
     * @return {Promise} resolves once the saving-operations are done successfully.
     */
    save()
    {
        return new Promise((resolve) =>
        {
            resolve();
        });
    }
};
