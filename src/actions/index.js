import axios from 'axios';
const ROOT_URL = WPSettings.root;

export const GET_POSTS = 'GET_POSTS';

export function getPosts() {
    const url = `${ROOT_URL}wp/v2/posts/?per_page=5&_embed`;
    const request = axios.get(url);
    return{
        type: GET_POSTS,
        payload: request
    }
}