import
{
    Item,
    ItemList,
    ItemQuery,
    ItemUpdate,
    emptyItemQuery
}
from "./item";

export default class StoreCQRS
{
    /**
     * @constructor
     * @param {function()} [callback] Called when the Store is ready
     * @param {Boolean} plugin Can dock into some Persistence-Layers via plugins
     * @returns {void}
     */
    constructor(callback, plugin = false)
    {
        /**
         * @type {ItemList}
         */
        let liveTodos = null;

        /**
         * Read the local ItemList from localStorage.
         *
         * @returns {ItemList} Current array of todos
         */
        this.getItems = () =>
        {
            return liveTodos || JSON.parse(plugin.get() || "[]");
        };

        /**
         * Write the local ItemList to localStorage.
         *
         * @param {ItemList} todos Array of todos to write
         * @returns {void}
         */
        this.setItems = (todos) =>
        {
            plugin.set(JSON.stringify(liveTodos = todos));
        };

        if (callback)
        {
            callback();
        }
    }

    /**
     * Find items with properties matching those on query.
     *
     * @param {ItemQuery} query Query to match
     * @param {function(ItemList)} callback Called when the query is done
     *
     * @example
     * db.find({completed: true}, data => {
     *	 // data shall contain items whose completed properties are true
     * })
     * @returns {void}
     */
    find(query, callback)
    {
        const todos = this.getItems();

        callback(todos.filter(todo =>
        {
            let k = null;

            for (k in query)
            {
                if (query[k] !== todo[k])
                {
                    return false;
                }
            }
            return true;
        }));
    }

    /**
     * Update an item in the Store.
     *
     * @param {ItemUpdate} update Record with an id and a property to update
     * @param {function()} [callback] Called when partialRecord is applied
     * @returns {void}
     */
    update(update, callback)
    {
        const id = update.id;
        const todos = this.getItems();
        let i = todos.length;

        while (i--)
        {
            if (todos[i].id === id)
            {
                let k = null;

                for (k in update)
                {
                    if (updates.hasOwnProperty(k))
                    {
                        todos[i][k] = update[k];
                    }
                }
                break;
            }
        }

        this.setItems(todos);

        if (callback)
        {
            callback();
        }
    }

    /**
     * Insert an item into the Store.
     *
     * @param {Item} item Item to insert
     * @param {function()} [callback] Called when item is inserted
     * @returns {void}
     */
    insert(item, callback)
    {
        const todos = this.getItems()();

        todos.push(item);
        this.setItems(todos);

        if (callback)
        {
            callback();
        }
    }

    /**
     * Remove items from the Store based on a query.
     *
     * @param {ItemQuery} query Query matching the items to remove
     * @param {function(ItemList)|function()} [callback] Called when records matching query are removed
     * @returns {void}
     */
    remove(query, callback)
    {
        const todos = this.getItems().filter(todo =>
        {
            let k = null;

            for (k in query)
            {
                if (query[k] !== todo[k])
                {
                    return true;
                }
            }

            return false;
        });

        this.setItems(todos);

        if (callback)
        {
            callback(todos);
        }
    }

    /**
     * Count total, active, and completed todos.
     *
     * @param {function(number, number, number)} callback Called when the count is completed
     * @returns {void}
     */
    count(callback)
    {
        this.find(emptyItemQuery, data =>
        {
            const total = data.length;

            let i = total;
            let completed = 0;

            while (i--)
            {
                completed += data[i].completed;
            }
            callback(total, total - completed, completed);
        });
    }
}
