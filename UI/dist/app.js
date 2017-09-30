define(['./controller', './helpers', './template', './store', './view'], function (_controller, _helpers, _template, _store, _view) {
  'use strict';

  var _controller2 = _interopRequireDefault(_controller);

  var _template2 = _interopRequireDefault(_template);

  var _store2 = _interopRequireDefault(_store);

  var _view2 = _interopRequireDefault(_view);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var store = new _store2.default('todos-vanilla-es6');

  var template = new _template2.default();
  var view = new _view2.default(template);

  /**
   * @type {Controller}
   */
  var controller = new _controller2.default(store, view);

  var setView = function setView() {
    return controller.setView(document.location.hash);
  };
  (0, _helpers.$on)(window, 'load', setView);
  (0, _helpers.$on)(window, 'hashchange', setView);
});