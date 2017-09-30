define(['exports', './item', './helpers'], function (exports, _item, _helpers) {
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

	var Template = function () {
		function Template() {
			_classCallCheck(this, Template);
		}

		_createClass(Template, [{
			key: 'itemList',
			value: function itemList(items) {
				return items.reduce(function (a, item) {
					return a + ('\n<li data-id="' + item.id + '"' + (item.completed ? ' class="completed"' : '') + '>\n\t<input class="toggle" type="checkbox" ' + (item.completed ? 'checked' : '') + '>\n\t<label>' + (0, _helpers.escapeForHTML)(item.title) + '</label>\n\t<button class="destroy"></button>\n</li>');
				}, '');
			}
		}, {
			key: 'itemCounter',
			value: function itemCounter(activeTodos) {
				return activeTodos + ' item' + (activeTodos !== 1 ? 's' : '') + ' left';
			}
		}]);

		return Template;
	}();

	exports.default = Template;
});