import { GET_POSTS } from '../actions/index';

export default (state = [], action) => {
    switch(action.type) {
        case GET_POSTS:
            return action.payload.data;

        default:
            return state;
    }
    
    
}