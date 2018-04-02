'use strict';

const reporter = store => next => action => {
  console.log('ACTION', action);
  try {
    let result = next(action);
    console.log('__STATE IN REP__', store.getState());
    return result;
  } catch (error) {
    error.action = action;
    console.error('__ERROR__', error);
    return error;
  }
};
export default reporter;