import { POSTS_HAS_ERRORED } from '../actions/index';

export default (state = false, action) => {
    switch (action.type) {
        case POSTS_HAS_ERRORED:
            return action.hasErrored;

        default:
            return state;
    }
}