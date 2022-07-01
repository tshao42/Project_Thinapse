import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { checkUserFollow } from '../../store/follow'
import { getAllPostsByUserId, loadFeedPost } from '../../store/posts';



function Feed(){


    const dispatch = useDispatch();
    useEffect(()=>{
        hydrating();
    }, [dispatch]);

    const currentUser = useSelector(state=>{
        return state.session.user;
    });   
    
    const userFollowing = useSelector(state=>{
        return state.follow.following;
    });

    const postDepo = useSelector(state=>{
        return state.posts.posts;
    })

    const hydrating = async()=>{
        await dispatch(checkUserFollow(currentUser.id))
        .then(()=>(loadFeedPost(followingUsersId)));
    }

    const followingUsersId=Object.keys(userFollowing);

    return(
        <div>
            {currentUser &&
            <div>Hello from Feed!</div>
            }
            {!currentUser &&
            <div>
                <div>will be redirecting to login page...</div>
                <Redirect to='/login' />
            </div>
            }
        </div>
    )
}



export default Feed;