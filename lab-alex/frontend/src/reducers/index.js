'use strict';

import { combineReducers } from 'redux';
import lists from './list-reducer.js';

export default combineReducers({ lists });