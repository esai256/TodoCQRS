import Controller from './controller';
import {$on} from './helpers';
import Template from './template';
import StoreCQRS from './storeCQRS';
import View from './view';

const store = new StoreCQRS('todos-cqrs-es6');

const template = new Template();
const view = new View(template);

/**
 * @type {Controller}
 */
const controller = new Controller(store, view);

const setView = () => controller.setView(document.location.hash);
$on(window, 'load', setView);
$on(window, 'hashchange', setView);
