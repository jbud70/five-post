const SELECT_POST = 'SELECT_POST';

export function selectPost() {
    return{
        type: SELECT_POST,
        text: 'Post has been selected'
    }
}