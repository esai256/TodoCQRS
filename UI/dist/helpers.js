define(['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.qs = qs;
  exports.$on = $on;
  exports.$delegate = $delegate;
  /**
   * querySelector wrapper
   *
   * @param {string} selector Selector to query
   * @param {Element} [scope] Optional scope element for the selector
   */
  function qs(selector, scope) {
    return (scope || document).querySelector(selector);
  }

  /**
   * addEventListener wrapper
   *
   * @param {Element|Window} target Target Element
   * @param {string} type Event name to bind to
   * @param {Function} callback Event callback
   * @param {boolean} [capture] Capture the event
   */
  function $on(target, type, callback, capture) {
    target.addEventListener(type, callback, !!capture);
  }

  /**
   * Attach a handler to an event for all elements matching a selector.
   *
   * @param {Element} target Element which the event must bubble to
   * @param {string} selector Selector to match
   * @param {string} type Event name
   * @param {Function} handler Function called when the event bubbles to target
   *                           from an element matching selector
   * @param {boolean} [capture] Capture the event
   */
  function $delegate(target, selector, type, handler, capture) {
    var dispatchEvent = function dispatchEvent(event) {
      var targetElement = event.target;
      var potentialElements = target.querySelectorAll(selector);
      var i = potentialElements.length;

      while (i--) {
        if (potentialElements[i] === targetElement) {
          handler.call(targetElement, event);
          break;
        }
      }
    };

    $on(target, type, dispatchEvent, !!capture);
  }

  /**
   * Encode less-than and ampersand characters with entity codes to make user-
   * provided text safe to parse as HTML.
   *
   * @param {string} s String to escape
   *
   * @returns {string} String with unsafe characters escaped with entity codes
   */
  var escapeForHTML = exports.escapeForHTML = function escapeForHTML(s) {
    return s.replace(/[&<]/g, function (c) {
      return c === '&' ? '&amp;' : '&lt;';
    });
  };
});