import { csrfFetch } from "./csrf";

export const FIND_USER_FOLLOWING = "follows/FIND_USER_FOLLOWING";
export const ADD_FOLLOW = "follows/ADD_FOLLOW";
export const UNFOLLOW = "follows/UNFOLLOW"

const loadUserFollow = (followers,following)=>({
    type: FIND_USER_FOLLOWING,
    followers,
    following
});

const addFollow = (follower)=>({
    type: ADD_FOLLOW,
    follower
})

const removeFollow = (followerId)=>({
    type: UNFOLLOW,
    followerId
})


export const checkUserFollow = (userId)=>async dispatch=>{
    const response = await csrfFetch(`/api/follow/user/${userId}`);
    if (response.ok){
        const {followers, following} = await response.json();
        dispatch (loadUserFollow(followers,following));
    }
}


// export const checkFollowRelation = (followerId, followingId) => async dispatch =>{
//     const response = await csrfFetch(`/api/check/${followerId}/${followingId}`);
//     if (response.ok){
//         const follow = await response.json();
//         dispatch (verifyFollow (followerId, followingId));
//     }
// }

export const createFollow = (followerId, followingId)=>async dispatch=>{
    const response = await csrfFetch (`/api/follow/user/${followerId}`,{
        method: 'POST',
        headers :{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({followerId, followingId})
    });
    const {followers} = await response.json();
    dispatch (addFollow(followers));
    console.log(followers.followerId)
    return followers;

}

export const deleteFollow = (followerId, followingId) => async dispatch =>{
    const response = await csrfFetch(`/api/follow/${followerId}/${followingId}`,{
        method: 'DELETE'
    })

    if (response.ok){
        const deletedFollow = await response.json();
        const { deletedFollower, deletedFollowing } = deletedFollow;
        
        dispatch(removeFollow(deletedFollower));
    }
}



const initialState = { followers:{}, following:{} };
const followReducer = ( state = initialState, action) => {
    switch (action.type){
        case FIND_USER_FOLLOWING:
            let loadedFollow = { ...state, followers:{}, following:{} };
            action.followers.forEach(
                (follower)=>loadedFollow.followers[follower.followerId] = follower
            );
            action.following.forEach(
                (following)=>loadedFollow.following[following.followingId]  = following
            )
            return loadedFollow;
        case ADD_FOLLOW:
            let beforeFollow = {...state}
            beforeFollow.followers[action.follower.followerId]=action.follower;
            return beforeFollow;
        case UNFOLLOW:
            const deletedFollowing = {...state};
            delete deletedFollowing.followers[action.followerId];
            return deletedFollowing;
        default:
            return state;
    }
}

export default followReducer;