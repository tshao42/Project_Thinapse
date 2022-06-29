import React from 'react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useParams} from 'react-router-dom';
import { getAllCommentsInDatabaseByUser } from '../../store/comments';
import { getAllPostsByUserId } from '../../store/posts';
import { loadOneUser } from '../../store/users';
import './UserProfile.css';

function UserProfile(){
    //necessary function calls
    const { profileId } = useParams();
    const dispatch = useDispatch();

    //initialization: get all the posts and comments
    //and then try to grab the users from the database
    //3 things need to initialize:
    //posts, comments, and the current User Id
    //currentUserId would be used for follow/unfollow purpose later

    //useSelector;
    const allPosts = useSelector(state => {
        return state.posts.posts;
    });
    //not needed for now, but there is space for implementation
    //     const allComments = useSelector(state=>{
    //     return state.comments.comments;
    // });
    //==============for followerUse===============
    const currentUser = useSelector(state=>{
        return state.session.user;
    });
    
    const ownerOfProfile = useSelector(state=>{
        return state.users.users;
    });

    //useEffect;
    //hydrating when rendering
    //need to grab all the posts and comments
    //user would be grabbed from the session data
    useEffect(() => {
        dispatch(getAllPostsByUserId(profileId));
        // dispatch(getAllCommentsInDatabaseByUser(profileId));
        dispatch(loadOneUser(profileId));

    },[dispatch]);

    return(
        <div class='leftHalfProfile'>
            <div>Posts by</div>
            <div className='profilePagePostContainer'>
                <ol className='singleUserPostFeed'>
                {Object.values(allPosts).map(({title,body})=>(
                    <div className='individualPost'>
                        <h1>{title}</h1>
                        <p>{body}</p>
                    </div>
                ))}
                </ol>
            </div>
        </div>
    )

}



export default UserProfile;