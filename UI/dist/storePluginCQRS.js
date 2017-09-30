define(["exports", "storePlugin"], function (exports, _storePlugin) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.StorePluginCQRS = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var StorePluginCQRS = exports.StorePluginCQRS = function (_StorePlugin) {
        _inherits(StorePluginCQRS, _StorePlugin);

        function StorePluginCQRS() {
            _classCallCheck(this, StorePluginCQRS);

            return _possibleConstructorReturn(this, (StorePluginCQRS.__proto__ || Object.getPrototypeOf(StorePluginCQRS)).call(this));
        }

        return StorePluginCQRS;
    }(_storePlugin.StorePlugin);
});