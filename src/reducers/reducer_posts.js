import { POSTS_FETCH_COMPLETE } from '../actions/index';

export default (state = [], action) => {
    switch (action.type) {
        case POSTS_FETCH_COMPLETE:
            return action.posts;

        default:
            return state;
    }
}