/**
 * Handles subscribtions and messages
 * @class
 * @type {Bus}
 */

class Bus
{
    /**
     * @constructor
     * @return {void}
     */
    constructor()
    {
        this.Subscribers = new Map();
    }

    /**
     * publishes a message to all subscribers
     * @param  {Symbol} symbol  Identifies which message has been published
     * @param  {Message} message The message which has been published
     * @return {void}
     */
    publish(symbol, message)
    {
        //set new collection of subscribers to this message-type (symbol) if not yet existing
        ensureSubscriberCollection(this.Subscribers, symbol);

        this.Subscribers.get(symbol).forEach(subscriber =>
        {
            subscriber.handle(message);
        });
    }

    /**
     * Registers a subscriber to an type of message
     * @param  {Symbol} symbol     Identifies which message should be subscribed to
     * @param  {Subscriber} subscriber The class which handles the message
     * @return {void}
     */
    subscribe(symbol, subscriber)
    {
        //set new collection of subscribers to this message-type (symbol) if not yet existing
        ensureSubscriberCollection(this.Subscribers, symbol);

        this.Subscribers.get(symbol).add(new subscriber());
    }
}

//mutating -> ew?
function ensureSubscriberCollection(map, symbol) {
    if (!map.get(symbol))
    {
        map.set(symbol, new Set());
    }
}

module.exports = new Bus();
