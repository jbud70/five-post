import { POSTS_IS_FETCHING } from '../actions/index';

export default (state = false, action) => {
    switch (action.type) {
        case POSTS_IS_FETCHING:
            return action.isFetching;

        default:
            return state;
    }
}