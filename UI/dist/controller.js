define(['exports', './item', './store', './view'], function (exports, _item, _store, _view) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _store2 = _interopRequireDefault(_store);

	var _view2 = _interopRequireDefault(_view);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

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

	var Controller = function () {
		/**
   * @param  {!Store} store A Store instance
   * @param  {!View} view A View instance
   */
		function Controller(store, view) {
			var _this = this;

			_classCallCheck(this, Controller);

			this.store = store;
			this.view = view;

			view.bindAddItem(this.addItem.bind(this));
			view.bindEditItemSave(this.editItemSave.bind(this));
			view.bindEditItemCancel(this.editItemCancel.bind(this));
			view.bindRemoveItem(this.removeItem.bind(this));
			view.bindToggleItem(function (id, completed) {
				_this.toggleCompleted(id, completed);
				_this._filter();
			});
			view.bindRemoveCompleted(this.removeCompletedItems.bind(this));
			view.bindToggleAll(this.toggleAll.bind(this));

			this._activeRoute = '';
			this._lastActiveRoute = null;
		}

		/**
   * Set and render the active route.
   *
   * @param {string} raw '' | '#/' | '#/active' | '#/completed'
   */


		_createClass(Controller, [{
			key: 'setView',
			value: function setView(raw) {
				var route = raw.replace(/^#\//, '');
				this._activeRoute = route;
				this._filter();
				this.view.updateFilterButtons(route);
			}
		}, {
			key: 'addItem',
			value: function addItem(title) {
				var _this2 = this;

				this.store.insert({
					id: Date.now(),
					title: title,
					completed: false
				}, function () {
					_this2.view.clearNewTodo();
					_this2._filter(true);
				});
			}
		}, {
			key: 'editItemSave',
			value: function editItemSave(id, title) {
				var _this3 = this;

				if (title.length) {
					this.store.update({ id: id, title: title }, function () {
						_this3.view.editItemDone(id, title);
					});
				} else {
					this.removeItem(id);
				}
			}
		}, {
			key: 'editItemCancel',
			value: function editItemCancel(id) {
				var _this4 = this;

				this.store.find({ id: id }, function (data) {
					var title = data[0].title;
					_this4.view.editItemDone(id, title);
				});
			}
		}, {
			key: 'removeItem',
			value: function removeItem(id) {
				var _this5 = this;

				this.store.remove({ id: id }, function () {
					_this5._filter();
					_this5.view.removeItem(id);
				});
			}
		}, {
			key: 'removeCompletedItems',
			value: function removeCompletedItems() {
				this.store.remove({ completed: true }, this._filter.bind(this));
			}
		}, {
			key: 'toggleCompleted',
			value: function toggleCompleted(id, completed) {
				var _this6 = this;

				this.store.update({ id: id, completed: completed }, function () {
					_this6.view.setItemComplete(id, completed);
				});
			}
		}, {
			key: 'toggleAll',
			value: function toggleAll(completed) {
				var _this7 = this;

				this.store.find({ completed: !completed }, function (data) {
					var _iteratorNormalCompletion = true;
					var _didIteratorError = false;
					var _iteratorError = undefined;

					try {
						for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
							var id = _step.value.id;

							_this7.toggleCompleted(id, completed);
						}
					} catch (err) {
						_didIteratorError = true;
						_iteratorError = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion && _iterator.return) {
								_iterator.return();
							}
						} finally {
							if (_didIteratorError) {
								throw _iteratorError;
							}
						}
					}
				});

				this._filter();
			}
		}, {
			key: '_filter',
			value: function _filter(force) {
				var _this8 = this;

				var route = this._activeRoute;

				if (force || this._lastActiveRoute !== '' || this._lastActiveRoute !== route) {
					/* jscs:disable disallowQuotedKeysInObjects */
					this.store.find({
						'': _item.emptyItemQuery,
						'active': { completed: false },
						'completed': { completed: true }
					}[route], this.view.showItems.bind(this.view));
					/* jscs:enable disallowQuotedKeysInObjects */
				}

				this.store.count(function (total, active, completed) {
					_this8.view.setItemsLeft(active);
					_this8.view.setClearCompletedButtonVisibility(completed);

					_this8.view.setCompleteAllCheckbox(completed === total);
					_this8.view.setMainVisibility(total);
				});

				this._lastActiveRoute = route;
			}
		}]);

		return Controller;
	}();

	exports.default = Controller;
});