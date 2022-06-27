import { csrfFetch } from "./csrf";

export const LOAD_COMMENTS = "comments/LOAD_COMMENTS";
export const REMOVE = "comments/REMOVE";
export const CREATE = "comments/CREATE";
export const UPDATE = "comments/LOAD";

const loadall = (comments, postId)=>({
    type: LOAD_COMMENTS,
    comments,
    postId
})
const create = (comment) => ({
    type: CREATE,
    comment
});
const remove = (commentId) => ({
    type: REMOVE,
    commentId
})

export const getAllComments = (postId) => async dispatch => {
    const response = await csrfFetch(`/api/comments/forpost/${postId}`);
    if (response.ok){
        const comments = await response.json();
        dispatch(loadall(comments, postId));
    }
}

export const createComment = (payload) => async dispatch =>{
    console.log(`currently hitting the route /api/comments`)
    const {userId, postId, body} = payload;
    console.log(`the Payload is: ${userId} ${postId} ${body}`);
    const response = await csrfFetch(`/api/comments`,{
        method: 'POST',
        headers:{
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({userId, postId, body})
    })
        const comment = await response.json()
        dispatch(create(comment))
        return comment;
}

export const updateComment = (commentId, postId, payload) => async dispatch => {
    const response = await csrfFetch(`/api/posts/${postId}/comments/${commentId}`,{
        method: 'PUT',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const comment = await response.json()
        dispatch(create(comment))
        return comment;
    }
}

export const deleteComment = (commentId) => async dispatch => {
    const response = await csrfFetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
    })

    if(response.ok) {
        const  deletedCommentId = await response.json();
        dispatch(remove(deletedCommentId));
        return deletedCommentId;
    }
}

const initialState = {comments:{}};

const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOAD_COMMENTS:
        const loadedComments = {...state, comments:{...state.posts}};
        action.comments.forEach(
            (comment) => (loadedComments.comments[comment.id]=comment));
        return loadedComments;
      case REMOVE:
        const newState = { ...state };
        delete newState.comments[action.commentId];
        return newState;
      case CREATE:
        return {...state, [action.comment.id]: action.comment};
      default:
        return state;
    }
};

export default commentsReducer;
