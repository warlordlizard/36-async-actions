'use strict';

import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import appCreateStore from '../../lib/app-create-store.js';
import Dashboard from '../dashboard';

const store = appCreateStore();