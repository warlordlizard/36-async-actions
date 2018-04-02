'use strict';

import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import appCreateStore from '../../lib/app-create-store.js';
import Dashboard from '../dashboard';

const store = appCreateStore();

export default class App extends React.Component {
  render() {
    return(
      <main className='app'>
        <Provider>
          <BrowserRouter>
            <section>
              <Route exact path='/' component={Dashboard} />
            </section>
          </BrowserRouter>
        </Provider>
      </main>
    );
  }
}