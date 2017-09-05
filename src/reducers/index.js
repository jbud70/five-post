import { combineReducers } from 'redux';
import PostList from './reducer_postList';

const rootReducer = combineReducers({
    allPosts: PostList
});

export default rootReducer;