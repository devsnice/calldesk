import { combineReducers } from 'redux';

import posts from '../ducks/posts';

const reducer = combineReducers({ posts });

export default reducer;
