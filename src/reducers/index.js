import { combineReducers } from 'redux';
import posts from './reducer_posts';
import postsHasErrored from './reducer_postsHasErrored';
import postsIsFetching from './reducer_postsIsFetching';

const rootReducer = combineReducers({
    posts,
    postsHasErrored,
    postsIsFetching
});

export default rootReducer;