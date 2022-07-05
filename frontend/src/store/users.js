import { csrfFetch } from "./csrf";

export const LOAD_ALL = "users/LOAD_ALL";
export const LOAD_ONE = "users/LOAD_ONE";

const loadAll = (users)=>({
    type: LOAD_ALL,
    users
})

const loadOne = (user)=>({
    type: LOAD_ONE,
    user
})



export const loadAllUsers = ()=>async dispatch =>{
    const response = await csrfFetch(`/api/users`);
    if (response.ok){
        const users = await response.json();
        dispatch(loadAll(users));
    }
}

export const loadOneUser = (userId) => async dispatch =>{
    const response = await csrfFetch (`/api/users/${userId}`);
    if (response.ok){
        const user = await response.json();
        dispatch(loadOne(user));
    } else return false;
}

const initialState = {
    users:{}
}
const usersReducer = (state = initialState, action) =>{
    switch (action.type){
        case LOAD_ALL:
            const loadedUsers = {...state, users:{...state.users}};
            action.users.forEach(
                (user)=>(loadedUsers.users[user.id] = user)
            );
            return loadedUsers;
        case LOAD_ONE:
            const singleUser = {...state, users:{...state.users}};
            let userId = action.user.id;
            singleUser.users[userId] = action.user;
            return singleUser;
        default:
            return state;
    }
}

export default usersReducer;