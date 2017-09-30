define(['exports', './item'], function (exports, _item) {
	'use strict';

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

	var Store = function () {
		/**
   * @param {!string} name Database name
   * @param {function()} [callback] Called when the Store is ready
   */
		function Store(name, callback) {
			_classCallCheck(this, Store);

			/**
    * @type {Storage}
    */
			var localStorage = window.localStorage;

			/**
    * @type {ItemList}
    */
			var liveTodos = void 0;

			/**
    * Read the local ItemList from localStorage.
    *
    * @returns {ItemList} Current array of todos
    */
			this.getLocalStorage = function () {
				return liveTodos || JSON.parse(localStorage.getItem(name) || '[]');
			};

			/**
    * Write the local ItemList to localStorage.
    *
    * @param {ItemList} todos Array of todos to write
    */
			this.setLocalStorage = function (todos) {
				localStorage.setItem(name, JSON.stringify(liveTodos = todos));
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
   */


		_createClass(Store, [{
			key: 'find',
			value: function find(query, callback) {
				var todos = this.getLocalStorage();
				var k = void 0;

				callback(todos.filter(function (todo) {
					for (k in query) {
						if (query[k] !== todo[k]) {
							return false;
						}
					}
					return true;
				}));
			}
		}, {
			key: 'update',
			value: function update(_update, callback) {
				var id = _update.id;
				var todos = this.getLocalStorage();
				var i = todos.length;
				var k = void 0;

				while (i--) {
					if (todos[i].id === id) {
						for (k in _update) {
							todos[i][k] = _update[k];
						}
						break;
					}
				}

				this.setLocalStorage(todos);

				if (callback) {
					callback();
				}
			}
		}, {
			key: 'insert',
			value: function insert(item, callback) {
				var todos = this.getLocalStorage();
				todos.push(item);
				this.setLocalStorage(todos);

				if (callback) {
					callback();
				}
			}
		}, {
			key: 'remove',
			value: function remove(query, callback) {
				var k = void 0;

				var todos = this.getLocalStorage().filter(function (todo) {
					for (k in query) {
						if (query[k] !== todo[k]) {
							return true;
						}
					}
					return false;
				});

				this.setLocalStorage(todos);

				if (callback) {
					callback(todos);
				}
			}
		}, {
			key: 'count',
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

		return Store;
	}();

	exports.default = Store;
});