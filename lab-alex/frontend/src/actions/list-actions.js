'use strict';

import superagent from 'superagent';

export const listSet = (lists) => ({
  type: 'LIST_SET',
  payload: lists,
});

export const listCreate = (list) => ({
  type: 'LIST_CREATE',
  payload: list,
});

export const listUpdate = (list) => ({
  type: 'LIST_UPDATE',
  payload: list,
});

export const listDelete = (list) => ({
  type: 'LIST_DELETE',
  payload: list,
});

export const listsFetchRequest = () => (dispatch) => {
  return superagent.get(`${__API_URL__}/api/list`)
    .then(res => {
      dispatch(listSet(res.body));
      return res;
    });
};

export const listDeleteRequest = (list) => (dispatch) => {
  return superagent.delete(`${__API_URL__}/api/list/${list._id}`)
    .then(res => {
      dispatch(listSet(res.body));
      return res;
    });
};