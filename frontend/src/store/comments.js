import { csrfFetch } from "./csrf";

export const LOAD_COMMENTS = "comments/LOAD_COMMENTS";
export const REMOVE = "comments/REMOVE";
export const CREATE = "comments/CREATE";
export const UPDATE = "comments/LOAD";

const loadall = (comments)=>({
    type: LOAD_COMMENTS,
    comments
})

const update = (comment)=>({
    type: UPDATE,
    comment
});

const create = (comment) => ({
    type: CREATE,
    comment
});
const remove = (commentId, postId, userId) => ({
    type: REMOVE,
    commentId,
    postId,
    userId
})

export const getAllComments = (postId) => async dispatch => {
    const response = await csrfFetch(`/api/posts/${postId}`);

    if (response.ok){
        const comments = await response.json();
        dispatch(loadall(comments));
    }
}

export const createComment = (postId, payload) => async dispatch =>{
    const response = await csrfFetch(`/api/posts/${postId}`,{
        method: 'POST',
        headers:{ 'Content-Type' : 'application/json' },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const comment = await response.json()
        dispatch(create(comment))
        return comment;
      }
}

export const updateComment = (commentId, postId, payload) => async dispatch => {
    const response = await csrfFetch(`/api/posts/${postId}/comments/${commentId}`,{
        method: 'PUT',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const comment = await response.json()
        dispatch(update(comment))
        return comment;
    }
}

export const deleteComment = (postId,commentId, userId) => async dispatch => {
    const response = await csrfFetch(`/api/posts/${postId}/comments/${commentId}`, {
        method: 'DELETE',
    })

    if(response.ok) {
        const { id: deletedCommentId } = await response.json();
        dispatch(remove(deletedCommentId, postId, userId));
        return deletedCommentId;
    }
}

const initialState = {};

const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOAD_COMMENTS:
        const newComments = {};
        action.comments.forEach(comment => {
          newComments[comment.id] = comment;
        })
        return {
          ...state,
          ...newComments
        }
      case REMOVE:
        const newState = { ...state };
        delete newState[action.commentId];
        return newState;
      case CREATE:
      case UPDATE:
        return {
          ...state,
          [action.comment.id]: action.comment
        };
      default:
        return state;
    }
};

export default commentsReducer;
