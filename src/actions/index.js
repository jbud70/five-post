import axios from 'axios';
const ROOT_URL = WPSettings.root;

export const GET_POSTS = 'GET_POSTS';
export const POSTS_HAS_ERRORED = 'POSTS_HAS_ERRORED';
export const POSTS_IS_FETCHING = 'POSTS_IS_FETCHING';
export const POSTS_FETCH_COMPLETE = 'POSTS_FETCH_COMPLETE';

export const fetchPosts = () => {
    const url = `${ROOT_URL}wp/v2/posts/?per_page=5&_embed`;

    return (dispatch) => {
        dispatch(postsIsFetching(true));

        axios.get(url)
        .then((response) => {
            dispatch(postsIsFetching(false));
            dispatch(postsFetchDataSuccess(response.data));
        })
        .catch(() => {
            dispatch(postsHasErrored(true));
        });
    }
}

export const postsHasErrored = (bool) => {
    return {
        type: POSTS_HAS_ERRORED,
        hasErrored: bool
    }
}

export const postsIsFetching = (bool) => {
    return {
        type: POSTS_IS_FETCHING,
        isFetching: bool
    }
}

export const postsFetchDataSuccess = (posts) => {
    return {
        type: POSTS_FETCH_COMPLETE,
        posts: posts
    }
}