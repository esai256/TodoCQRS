define(['exports', './item', './helpers', './template'], function (exports, _item, _helpers, _template) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _template2 = _interopRequireDefault(_template);

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

	var _itemId = function _itemId(element) {
		return parseInt(element.parentNode.dataset.id, 10);
	};
	var ENTER_KEY = 13;
	var ESCAPE_KEY = 27;

	var View = function () {
		/**
   * @param {!Template} template A Template instance
   */
		function View(template) {
			var _this = this;

			_classCallCheck(this, View);

			this.template = template;
			this.$todoList = (0, _helpers.qs)('.todo-list');
			this.$todoItemCounter = (0, _helpers.qs)('.todo-count');
			this.$clearCompleted = (0, _helpers.qs)('.clear-completed');
			this.$main = (0, _helpers.qs)('.main');
			this.$toggleAll = (0, _helpers.qs)('.toggle-all');
			this.$newTodo = (0, _helpers.qs)('.new-todo');
			(0, _helpers.$delegate)(this.$todoList, 'li label', 'dblclick', function (_ref) {
				var target = _ref.target;

				_this.editItem(target);
			});
		}

		/**
   * Put an item into edit mode.
   *
   * @param {!Element} target Target Item's label Element
   */


		_createClass(View, [{
			key: 'editItem',
			value: function editItem(target) {
				var listItem = target.parentElement;

				listItem.classList.add('editing');

				var input = document.createElement('input');
				input.className = 'edit';

				input.value = target.innerText;
				listItem.appendChild(input);
				input.focus();
			}
		}, {
			key: 'showItems',
			value: function showItems(items) {
				this.$todoList.innerHTML = this.template.itemList(items);
			}
		}, {
			key: 'removeItem',
			value: function removeItem(id) {
				var elem = (0, _helpers.qs)('[data-id="' + id + '"]');

				if (elem) {
					this.$todoList.removeChild(elem);
				}
			}
		}, {
			key: 'setItemsLeft',
			value: function setItemsLeft(itemsLeft) {
				this.$todoItemCounter.innerHTML = this.template.itemCounter(itemsLeft);
			}
		}, {
			key: 'setClearCompletedButtonVisibility',
			value: function setClearCompletedButtonVisibility(visible) {
				this.$clearCompleted.style.display = !!visible ? 'block' : 'none';
			}
		}, {
			key: 'setMainVisibility',
			value: function setMainVisibility(visible) {
				this.$main.style.display = !!visible ? 'block' : 'none';
			}
		}, {
			key: 'setCompleteAllCheckbox',
			value: function setCompleteAllCheckbox(checked) {
				this.$toggleAll.checked = !!checked;
			}
		}, {
			key: 'updateFilterButtons',
			value: function updateFilterButtons(route) {
				(0, _helpers.qs)('.filters>.selected').className = '';
				(0, _helpers.qs)('.filters>[href="#/' + route + '"]').className = 'selected';
			}
		}, {
			key: 'clearNewTodo',
			value: function clearNewTodo() {
				this.$newTodo.value = '';
			}
		}, {
			key: 'setItemComplete',
			value: function setItemComplete(id, completed) {
				var listItem = (0, _helpers.qs)('[data-id="' + id + '"]');

				if (!listItem) {
					return;
				}

				listItem.className = completed ? 'completed' : '';

				// In case it was toggled from an event and not by clicking the checkbox
				(0, _helpers.qs)('input', listItem).checked = completed;
			}
		}, {
			key: 'editItemDone',
			value: function editItemDone(id, title) {
				var listItem = (0, _helpers.qs)('[data-id="' + id + '"]');

				var input = (0, _helpers.qs)('input.edit', listItem);
				listItem.removeChild(input);

				listItem.classList.remove('editing');

				(0, _helpers.qs)('label', listItem).textContent = title;
			}
		}, {
			key: 'bindAddItem',
			value: function bindAddItem(handler) {
				(0, _helpers.$on)(this.$newTodo, 'change', function (_ref2) {
					var target = _ref2.target;

					var title = target.value.trim();
					if (title) {
						handler(title);
					}
				});
			}
		}, {
			key: 'bindRemoveCompleted',
			value: function bindRemoveCompleted(handler) {
				(0, _helpers.$on)(this.$clearCompleted, 'click', handler);
			}
		}, {
			key: 'bindToggleAll',
			value: function bindToggleAll(handler) {
				(0, _helpers.$on)(this.$toggleAll, 'click', function (_ref3) {
					var target = _ref3.target;

					handler(target.checked);
				});
			}
		}, {
			key: 'bindRemoveItem',
			value: function bindRemoveItem(handler) {
				(0, _helpers.$delegate)(this.$todoList, '.destroy', 'click', function (_ref4) {
					var target = _ref4.target;

					handler(_itemId(target));
				});
			}
		}, {
			key: 'bindToggleItem',
			value: function bindToggleItem(handler) {
				(0, _helpers.$delegate)(this.$todoList, '.toggle', 'click', function (_ref5) {
					var target = _ref5.target;

					handler(_itemId(target), target.checked);
				});
			}
		}, {
			key: 'bindEditItemSave',
			value: function bindEditItemSave(handler) {
				(0, _helpers.$delegate)(this.$todoList, 'li .edit', 'blur', function (_ref6) {
					var target = _ref6.target;

					if (!target.dataset.iscanceled) {
						handler(_itemId(target), target.value.trim());
					}
				}, true);

				// Remove the cursor from the input when you hit enter just like if it were a real form
				(0, _helpers.$delegate)(this.$todoList, 'li .edit', 'keypress', function (_ref7) {
					var target = _ref7.target,
					    keyCode = _ref7.keyCode;

					if (keyCode === ENTER_KEY) {
						target.blur();
					}
				});
			}
		}, {
			key: 'bindEditItemCancel',
			value: function bindEditItemCancel(handler) {
				(0, _helpers.$delegate)(this.$todoList, 'li .edit', 'keyup', function (_ref8) {
					var target = _ref8.target,
					    keyCode = _ref8.keyCode;

					if (keyCode === ESCAPE_KEY) {
						target.dataset.iscanceled = true;
						target.blur();

						handler(_itemId(target));
					}
				});
			}
		}]);

		return View;
	}();

	exports.default = View;
});