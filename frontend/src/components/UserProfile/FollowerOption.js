import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'


function FollowerOption(){

    const { profileId } = useParams();
    const currentUser = useSelector(state=>{
        return state.session.user;
    });   
    const userFollower = useSelector(state=>{
        return state.follow.followers;
    })
    const userFollowing = useSelector(state=>{
        return state.follow.following;
    })

    //status indicators
    const loginUserFollowingProfile = (userFollower[currentUser.id]!==undefined);
    const profileUserFollowingLogin = (userFollowing[currentUser.id]!==undefined);


    //component conditional
    let relation;
    //following relations
    //only provide unfollow option
    if (loginUserFollowingProfile && profileUserFollowingLogin){
        relation=(
            <div>
                <div>Friends</div>
                <button onClick={handleFollow}>Unfollow</button>
            </div>
        )
    }
    if (loginUserFollowingProfile && !profileUserFollowingLogin){
        relation = (
            <div>
                <div>Following</div>
                <button onClick={handleFollow} >Unfollow</button>
            </div>
        )
    }
    //not following relations
    //only provide follow option
    if (!loginUserFollowingProfile && profileUserFollowingLogin){
        relation = (
            <div>
                <div>Followback?</div>
                <button onClick={handleUnfollow}>Follow</button>
            </div>
        )
    }
    if (!loginUserFollowingProfile && !profileUserFollowingLogin){
        relation = (
            <div>
                <div>Interested? Follow Now</div>
                <button onClick={handleUnfllow}>Follow</button>
            </div>
        )
    }
    console.log(`${loginUserFollowingProfile}, ${profileUserFollowingLogin}`)
    
    
    return(
        <div>
            {relation}
        </div>
    )
}


export default FollowerOption;