'use strict';

import reducer from '../reducers';
import thunk from './redux-thunk.js';
import reporter from './redux-reporter.js';
import { createStore, applyMiddleware } from 'redux';

const appCreateStore = () => (
  createStore(reducer, applyMiddleware(thunk, reporter))
);

export default appCreateStore;