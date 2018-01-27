import { createAction } from 'redux-actions';
import { put, take, select, call } from 'redux-saga/effects';

import postStoreService from '../services/postsStoreService';

const initialState = {
  byId: {},
  postsIds: [],
  loaded: false,
  loading: false,
  error: false
};

const duckName = 'app/posts';

const ACTIONS = {
  POSTS_REQUEST: `${duckName}/POSTS_REQUEST`,
  POSTS_REQUEST_SUCCESS: `${duckName}/POSTS_REQUEST_SUCCESS`,
  POSTS_REQUEST_FAILURE: `${duckName}/POSTS_REQUEST_FAILURE`
};

/**
 *  Reducer
 */

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTIONS.POSTS_REQUEST: {
      return {
        ...state,
        loading: true
      };
    }
    case ACTIONS.POSTS_REQUEST_SUCCESS: {
      return {
        ...state,
        postsIds: payload.postsIds,
        byId: payload.posts,
        loading: false,
        loaded: true,
        error: false
      };
    }
    case ACTIONS.POSTS_REQUEST_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: true,
        error: true
      };
    }

    default:
      return state;
  }
};

/**
 *  Action creater
 */

export const postsRequest = createAction(ACTIONS.POSTS_REQUEST);
export const postsRequestSuccess = createAction(
  ACTIONS.POSTS_REQUEST_SUCCESS,
  ({ posts, postsIds }) => ({
    posts,
    postsIds
  })
);
export const postsRequestFailure = createAction(ACTIONS.POSTS_REQUEST_FAILURE);

/**
 *  Saga
 */

export const loadPostsSaga = function*() {
  while (true) {
    const action = yield take(ACTIONS.POSTS_REQUEST);

    try {
      const posts = yield call(postStoreService.getAll);
      const postsIds = Object.keys(posts);

      yield put(
        postsRequestSuccess({
          posts,
          postsIds
        })
      );
    } catch (err) {
      yield put(postsRequestFailure());
    }
  }
};

export default reducer;
