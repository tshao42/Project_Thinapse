import { csrfFetch } from "./csrf";

export const LOAD_POSTS = "posts/LOAD_POSTS";
// export const LOAD = "posts/LOAD";
export const REMOVE = "posts/REMOVE";
export const CREATE = "posts/CREATE";
export const UPDATE = "posts/LOAD";

const loadall = (posts)=>({
    type: LOAD_POSTS,
    posts   //this is an array
})

// const load = (post)=>({
//     type: LOAD,
//     post
// });

const update = (post)=>({
    type: UPDATE,
    post
});

const create = (post) => ({
    type: CREATE,
    post
});
const remove = (postId, userId) => ({
    type: REMOVE,
    postId,
    userId
})

//okay
export const getAllPosts =() => async dispatch => {
    const response = await csrfFetch(`/api/posts`);
    //this returns an array of objects
    console.log(`response from getAllPosts!`);
    if (response.ok){
        const posts = await response.json();
        dispatch(loadall(posts));
    }
}

export const loadSinglePost = (postId) => async dispatch =>{
    const response = await csrfFetch (`/api/posts/${postId}`);
    if (response.ok){
        const post = await response.json();
        dispatch(loadall(post));
    } else return false;
}

export const createPost = (payload) => async dispatch =>{
    const response = await csrfFetch('/api/posts',{
        method: 'POST',
        headers:{ 'Content-Type' : 'application/json' },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const post = await response.json()
        dispatch(create(post))
        return post;
      }
}


export const updatePost = (postId, payload) => async dispatch => {
    const response = await fetch(`/api/posts/${postId}`,{
        method: 'PUT',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const post = await response.json()
        dispatch(update(post))
        return post;
    }
}

export const deletePost = (postId, userId) => async dispatch => {
    const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
    })

    if(response.ok) {
        const { id: deletedPostId } = await response.json();
        dispatch(remove(deletedPostId, postId, userId));
        return;
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
      case REMOVE:
        const newState = { ...state };
        delete newState[action.postId];
        return newState;
      case CREATE:
      case UPDATE:
        return {
          ...state,
          [action.post.id]: action.post
        };
      default:
        return state;
    }
};


export default postsReducer;
