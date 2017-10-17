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
        if (!this.Subscribers.get(symbol))
        {
            this.Subscribers.set(symbol, new Set());
        }

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
        if (!this.Subscribers.get(symbol))
        {
            this.Subscribers.set(symbol, new Set());
        }

        this.Subscribers.get(symbol).add(new subscriber());
    }
}

module.exports = new Bus();
