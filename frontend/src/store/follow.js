export const READ_FOLLOWING = "follows/READ_FOLLOWING"
export const LOAD_FOLLOW = "follows/LOAD_FOLLOW";
export const ADD_FOLLOW = "follows/ADD_FOLLOW";
export const REMOVE_FOLLOW = 'follows/REMOVE_FOLLOW';

const loadFollow = (ownId, userId)=>({
    type: LOAD_FOLLOW,
    ownId,
    userId
});

const addFollow = (ownId, userId)=>({
    type: ADD_FOLLOW,
    ownId,
    userId
})

const removeFollow = (ownId,userId)=>({
    type: REMOVE_FOLLOW,
    ownId,
    userId
})
