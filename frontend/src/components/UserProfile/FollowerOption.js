import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { createFollow, deleteFollow, checkUserFollow } from '../../store/follow'


function FollowerOption(){

    const dispatch = useDispatch();
    

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

    //handling functions
    //onclick dispatch
    const handleFollow = async() => {
        await dispatch(createFollow(currentUser.id, profileId))
        .then (()=>dispatch(checkUserFollow(profileId)));
    }


    const handleUnfollow = async() => {
        await dispatch(deleteFollow(currentUser.id, profileId))
        .then (()=>dispatch(checkUserFollow(profileId)));
    }

    //component conditional
    let relation;
    //following relations
    //only provide unfollow option
    if (loginUserFollowingProfile && profileUserFollowingLogin){
        relation=(
            <div>
                <div className='statusBanner'>Friends</div>
                <button className ="editButtonSubmit" onClick={handleUnfollow}>Unfollow</button>
            </div>
        )
    }
    if (loginUserFollowingProfile && !profileUserFollowingLogin){
        relation = (
            <div>
                <div className='statusBanner'>Following</div>
                <button className ="editButtonSubmit" onClick={handleUnfollow} >Unfollow</button>
            </div>
        )
    }
    //not following relations
    //only provide follow option
    if (!loginUserFollowingProfile && profileUserFollowingLogin){
        relation = (
            <div>
                <div className='statusBanner'>Followback?</div>
                <button className ="editButtonSubmit" onClick={handleFollow}>Follow</button>
            </div>
        )
    }
    if (!loginUserFollowingProfile && !profileUserFollowingLogin){
        relation = (
            <div>
                <div className='statusBanner'>Interested? Follow Now</div>
                <button className ="editButtonSubmit" onClick={handleFollow}>Follow</button>
            </div>
        )
    }
    console.log(`${loginUserFollowingProfile}, ${profileUserFollowingLogin}`)
    
    
    const followerCount = Object.keys(userFollower).length;
    const followingCount = Object.keys(userFollowing).length;
    return(
        <div>
            <div className='statusBanner2'>Followed by {followerCount} People</div>
            <div className='statusBanner2'>Following {followingCount} People</div>
            {relation}
        </div>
    )
}


export default FollowerOption;