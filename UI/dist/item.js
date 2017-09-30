define(["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /**
   * @typedef {!{id: number, completed: boolean, title: string}}
   */
  var Item = exports.Item = undefined;

  /**
   * @typedef {!Array<Item>}
   */
  var ItemList = exports.ItemList = undefined;

  /**
   * Enum containing a known-empty record type, matching only empty records unlike Object.
   *
   * @enum {Object}
   */
  var Empty = {
    Record: {}
  };

  /**
   * Empty ItemQuery type, based on the Empty @enum.
   *
   * @typedef {Empty}
   */
  var EmptyItemQuery = exports.EmptyItemQuery = undefined;

  /**
   * Reference to the only EmptyItemQuery instance.
   *
   * @type {EmptyItemQuery}
   */
  var emptyItemQuery = exports.emptyItemQuery = Empty.Record;

  /**
   * @typedef {!({id: number}|{completed: boolean}|EmptyItemQuery)}
   */
  var ItemQuery = exports.ItemQuery = undefined;

  /**
   * @typedef {!({id: number, title: string}|{id: number, completed: boolean})}
   */
  var ItemUpdate = exports.ItemUpdate = undefined;
});