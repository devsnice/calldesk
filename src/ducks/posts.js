import { createAction } from 'redux-actions';
import { put, take, call, all } from 'redux-saga/effects';

import postStoreService from '../services/postsStoreService';

const initialState = {
  byId: {},
  postsIds: [],
  loaded: false,
  loading: false,
  error: false,
  createForm: {
    error: false,
    done: false
  }
};

const duckName = 'app/posts';

const ACTIONS = {
  POSTS_REQUEST: `${duckName}/POSTS_REQUEST`,
  POSTS_REQUEST_SUCCESS: `${duckName}/POSTS_REQUEST_SUCCESS`,
  POSTS_REQUEST_FAILURE: `${duckName}/POSTS_REQUEST_FAILURE`,
  POSTS_INIT_CREATE_FORM: `${duckName}/POSTS_INIT_CREATE_FORM`,
  POSTS_ADD_REQUEST: `${duckName}/POSTS_ADD_REQUEST`,
  POSTS_ADD_REQUEST_SUCCESS: `${duckName}/POSTS_ADD_REQUEST_SUCCESS`,
  POSTS_ADD_REQUEST_FAILURE: `${duckName}/POSTS_ADD_REQUEST_FAILURE`
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
    case ACTIONS.POSTS_INIT_CREATE_FORM: {
      return {
        ...state,
        createForm: initialState.createForm
      };
    }
    case ACTIONS.POSTS_ADD_REQUEST_SUCCESS: {
      return {
        ...state,
        createForm: {
          ...state.createForm,
          done: true
        },
        postsIds: [...state.postsIds, payload.post.id],
        byId: {
          ...state.byId,
          [payload.post.id]: payload.post
        }
      };
    }

    default:
      return state;
  }
};

/**
 *  Action creater
 */

// Get posts
export const postsRequest = createAction(ACTIONS.POSTS_REQUEST);
export const postsRequestSuccess = createAction(
  ACTIONS.POSTS_REQUEST_SUCCESS,
  ({ posts, postsIds }) => ({
    posts,
    postsIds
  })
);
export const postsRequestFailure = createAction(ACTIONS.POSTS_REQUEST_FAILURE);

// Add post
export const postsInitCreateForm = createAction(ACTIONS.POSTS_INIT_CREATE_FORM);
export const postsAddRequest = createAction(
  ACTIONS.POSTS_ADD_REQUEST,
  post => ({ post })
);
export const postsAddRequestSuccess = createAction(
  ACTIONS.POSTS_ADD_REQUEST_SUCCESS
);
export const postsAddRequestFailure = createAction(
  ACTIONS.POSTS_ADD_REQUEST_FAILURE
);

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

export const addPostSaga = function*() {
  while (true) {
    const action = yield take(ACTIONS.POSTS_ADD_REQUEST);

    try {
      const newPost = yield call(postStoreService.add, action.payload.post);

      yield put(
        postsAddRequestSuccess({
          post: newPost
        })
      );
    } catch (err) {
      yield put(postsAddRequestFailure());
    }
  }
};

export const postsSaga = function*() {
  yield all([loadPostsSaga(), addPostSaga()]);
};

export default reducer;
