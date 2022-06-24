export const LOAD_POSTS = "posts/LOAD_POSTS";
export const UPDATE_POST = "posts/UPDATE_POST";
export const REMOVE_POST = 'posts/REMOVE_POST';
export const CREATE_POST = 'posts/CREATE_POST';

const load = (posts)=>({
    type: LOAD_POSTS,
    posts
});

const update = (post)=>({
    type: UPDATE_POST,
    post
});

const create = (post) => ({
    type: CREATE_POST,
    post
});
const remove = (postId, userId) => ({
    type: REMOVE_POST,
    postId,
    userId
})
