const EventStore = require("./eventStore");
const MongoClient = require("mongodb").MongoClient;

// Connection URL
const default_url = "mongodb://localhost:27017/TodoMVC";

/**
 * @class
 * @type {EventStoreMongoDB}
 */
module.exports = class EventStoreMongoDB extends EventStore
{
    /**
     * @constructor
     * @param  {string} url -the url which is used to connect to the database
     * @return {void}
     */
    constructor(url = default_url)
    {
        super();

        this.DBUrl = url;
    }

    /**
     * Saves the events to the eventStore in a database
     * @param  {Array} events the collection of events
     * @return {Promise} a Promise which resolves after the saving-operation is done
     */
    save(events)
    {
        return new Promise((resolveSave, rejectSave) =>
        {
            if (events && events.length)
            {
                super.save(events).then(() =>
                {
                    let counter = 0;

                    //TODO Flatten this
                    connectToDB(this.DBUrl, (connectionError, db) => new Promise((resolveDBConnection, rejectDBConnection) =>
                    {
                        if (!connectionError)
                        {
                            let eventStore = db.collection("EventStore");

                            resolveDBConnection();

                            events.forEach(event =>
                            {
                                eventStore.insert(event, insertionError =>
                                {
                                    if (!insertionError)
                                    {
                                        if (counter != events.length)
                                        {
                                            counter++;
                                        }
                                        else
                                        {
                                            this.publish(event);
                                            resolveSave();
                                        }
                                    }
                                    else
                                    {
                                        rejectSave(insertionError);
                                    }
                                });
                            });
                        }
                        else
                        {
                            rejectDBConnection(connectionError);
                        }
                    }));
                });
            }
            else
            {
                rejectSave("no events are being saved");
            }
        });
    }
};

//TODO Does this belong anywhere else?
/**
 * sets up the connection to the MongoDB database at the given url and performs actions
 * @param  {string} url the Url to connect to the MongoDB Database
 * @param  {Function} callback the callback which will be invoked once the connection to the database is established
 * @return {void}
 */
function connectToDB(url = default_url, callback)
{
    // Use connect method to connect to the server
    MongoClient.connect(url, function(err, db)
    {
        if (err != null)
        {
            throw new Error("DataBase cannot be reached.");
        }

        callback(err, db).then(() => db.close()).catch(error => console.error("an error occured", error));
    });
}
