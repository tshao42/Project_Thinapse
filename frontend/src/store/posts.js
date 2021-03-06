import { csrfFetch } from "./csrf";

export const LOAD_POSTS = "posts/LOAD_POSTS";
export const LOAD = "posts/LOAD";
export const REMOVE = "posts/REMOVE";
export const CREATE = "posts/CREATE";
export const UPDATE = "posts/LOAD";
export const LOAD_USER_POSTS = "posts/LOAD_USER_POSTS"
const loadall = (posts)=>({
    type: LOAD_POSTS,
    posts   //this is an array
})

const loadalluser = (posts)=>({
    type: LOAD_USER_POSTS,
    posts
})

const load = (post)=>({
    type: LOAD,
    post
});

const update = (post)=>({
    type: UPDATE,
    post
});

const create = (post) => ({
    type: CREATE,
    post
});
const remove = (postId) => ({
    type: REMOVE,
    postId
})

//okay
export const getAllPosts =() => async dispatch => {
    const response = await csrfFetch(`/api/posts`);
    if (response.ok){
        const posts = await response.json();
        dispatch(loadall(posts));
    }
}

//extra
export const getAllPostsByUserId = (userId) => async dispatch =>{
    const response = await csrfFetch(`/api/posts/users/${userId}`);
    if (response.ok){
        const posts = await response.json();
        dispatch(loadalluser(posts));
    } else return false;
}

export const loadFeedPost = (followerId) => async dispatch =>{
    const response = await csrfFetch(`/api/posts/allfollowing/${followerId}`);
    if (response.ok){
        const posts = await response.json();
        dispatch(loadalluser(posts));
    }
}


export const loadSinglePost = (postId) => async dispatch =>{
    const response = await csrfFetch (`/api/posts/${postId}`);
    if (response.ok){
        const post = await response.json();
        dispatch(load(post));
    } else return false;
}

export const createPost = (payload) => async dispatch =>{
    const {authorId, title, body} = payload;
    const response = await csrfFetch(`/api/posts`,{
        method: 'POST',
        headers:{
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({authorId, title, body})
    });
    const post = await response.json();
    dispatch(create(post));
    return post;
};




export const updatePost = (postId,payload) => async dispatch => {
    const { title, body} = payload;
    const response = await csrfFetch(`/api/posts/${postId}`,{
        method: 'PUT',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify({title, body})
    })
    if (response.ok) {
        const post = await response.json()
        dispatch(update(post))
    }
}

export const deletePost = (postId) => async dispatch => {
    const response = await csrfFetch(`/api/posts/${postId}`, {
        method: 'DELETE',
    })

    if(response.ok) {
        const deletedPostId = await response.json();
        dispatch(remove(deletedPostId));

    }
}

//!END
const initialState = {posts:{}};


const postsReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOAD_POSTS:
        const loadedPosts = {...state, posts:{...state.posts}};
        action.posts.forEach(
            (post) => (loadedPosts.posts[post.id]=post));
        return loadedPosts;
      case LOAD_USER_POSTS:
        const loadedUserPosts = {posts:{}};
        action.posts.forEach(
            (post) => (loadedUserPosts.posts[post.id]=post));
        return loadedUserPosts;
      case REMOVE:
        const newState = { ...state };
        delete newState.posts[action.postId];
        return newState;
      case LOAD:
        const singleLoad = {...state, posts:{...state.posts}};
        let postId= action.post.id;
        singleLoad.posts[postId] = action.post;
        return singleLoad;
      case CREATE:
        return {...state, [action.post.id]: action.post};
      case UPDATE:
        let baseState = {...state};
        baseState.posts[action.post.id]= action.post;
        return baseState;
      default:
        return state;
    }
};


export default postsReducer;
