define(["exports", "./item"], function (exports, _item) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var StoreCQRS = function () {
        /**
         * @constructor
         * @param {function()} [callback] Called when the Store is ready
         * @param {Boolean} plugin Can dock into some Persistence-Layers via plugins
         * @returns {void}
         */
        function StoreCQRS(callback) {
            var plugin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            _classCallCheck(this, StoreCQRS);

            /**
             * @type {ItemList}
             */
            var liveTodos = null;

            /**
             * Read the local ItemList from localStorage.
             *
             * @returns {ItemList} Current array of todos
             */
            this.getItems = function () {
                return liveTodos || JSON.parse(plugin.get() || "[]");
            };

            /**
             * Write the local ItemList to localStorage.
             *
             * @param {ItemList} todos Array of todos to write
             * @returns {void}
             */
            this.setItems = function (todos) {
                plugin.set(JSON.stringify(liveTodos = todos));
            };

            if (callback) {
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


        _createClass(StoreCQRS, [{
            key: "find",
            value: function find(query, callback) {
                var todos = this.getItems();

                callback(todos.filter(function (todo) {
                    var k = null;

                    for (k in query) {
                        if (query[k] !== todo[k]) {
                            return false;
                        }
                    }
                    return true;
                }));
            }
        }, {
            key: "update",
            value: function update(_update, callback) {
                var id = _update.id;
                var todos = this.getItems();
                var i = todos.length;

                while (i--) {
                    if (todos[i].id === id) {
                        var k = null;

                        for (k in _update) {
                            if (updates.hasOwnProperty(k)) {
                                todos[i][k] = _update[k];
                            }
                        }
                        break;
                    }
                }

                this.setItems(todos);

                if (callback) {
                    callback();
                }
            }
        }, {
            key: "insert",
            value: function insert(item, callback) {
                var todos = this.getItems()();

                todos.push(item);
                this.setItems(todos);

                if (callback) {
                    callback();
                }
            }
        }, {
            key: "remove",
            value: function remove(query, callback) {
                var todos = this.getItems().filter(function (todo) {
                    var k = null;

                    for (k in query) {
                        if (query[k] !== todo[k]) {
                            return true;
                        }
                    }

                    return false;
                });

                this.setItems(todos);

                if (callback) {
                    callback(todos);
                }
            }
        }, {
            key: "count",
            value: function count(callback) {
                this.find(_item.emptyItemQuery, function (data) {
                    var total = data.length;

                    var i = total;
                    var completed = 0;

                    while (i--) {
                        completed += data[i].completed;
                    }
                    callback(total, total - completed, completed);
                });
            }
        }]);

        return StoreCQRS;
    }();

    exports.default = StoreCQRS;
});