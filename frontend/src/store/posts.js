import { csrfFetch } from "./csrf";

export const LOAD_POSTS = "posts/LOAD_POSTS";
// export const LOAD = "posts/LOAD";
export const REMOVE = "posts/REMOVE";
export const CREATE = "posts/CREATE";
export const UPDATE = "posts/LOAD";

const loadall = (posts)=>({
    type: LOAD_POSTS,
    posts
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

export const getAllPosts = () => async dispatch => {
    const response = await csrfFetch(`/api/`);

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
        return deletedPostId;
    }
}

const initialState = {};


const postsReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOAD_POSTS:
        const newPosts = {};
        action.posts.forEach(post => {
          newPosts[post.id] = post;
        })
        return {
          ...state,
          ...newPosts
        }
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
