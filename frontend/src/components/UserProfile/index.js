import React from 'react';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useParams} from 'react-router-dom';
import { getAllCommentsInDatabaseByUser } from '../../store/comments';
import { getAllPostsByUserId } from '../../store/posts';
import { loadOneUser } from '../../store/users';
import './UserProfile.css';
import { checkUserFollow } from '../../store/follow';
import FollowerOption from './FollowerOption';

function UserProfile(){
    //necessary function calls
    const { profileId } = useParams();
    const dispatch = useDispatch();
    //hydrating state
    const [loaded, setLoaded] = useState(false);


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
    // const userFollower = useSelector(state=>{
    //     return state.follow.followers;
    // })
    // const userFollowing = useSelector(state=>{
    //     return state.follow.following;
    // })
    const [showFollow, setShowFollow] = useState(false);
    const ownerOfProfile = useSelector(state=>{
        return state.users.users;
    });
    

    //useEffect;
    //hydrating when rendering
    //need to grab all the posts and comments
    //user would be grabbed from the session data
    useEffect(() => {
        hydrating();
    },[dispatch]);


    //interesting thing:
    //reminder to use parseInt for return from the useParam
    const hydrating = async()=>{
        await dispatch(getAllPostsByUserId(profileId)).
        then (()=>dispatch(loadOneUser(profileId)))
        .then (()=>dispatch(checkUserFollow(profileId)))
        .then(()=>setLoaded(true))
        .then(()=>setShowFollow(currentUser));
    }

    const numberOfPosts = Object.keys(allPosts).length;
    
    return(
        <div>
        {loaded &&
        <div className='overallProfileContainer'>
            <div className='leftHalfProfile'>
                <div className='profilePagePostContainer'>
                    <ol className='singleUserPostFeed'>
                    {Object.values(allPosts).map(({id, title,body})=>(
                        <div className='individualPost'>
                            <Link to={`/posts/${id}`} style={{textDecoration: 'none'}}>
                                <h1>{title}</h1>
                            </Link>
                            <p>{body}</p>
                        </div>
                    ))}
                    <div id='postBySingleTitle'>Posts by {ownerOfProfile[profileId].username}</div>
                    </ol>
                </div>
            </div>
            <div className='rightHalfProfile'>
                <div id = 'userNameLargerDisplay'>{ownerOfProfile[profileId].username}</div>
                <img id='profilePageAvatar' src={`${ownerOfProfile[profileId].avatarUrl}`} alt='avatar' />
                <div className='statisticsOfUser'>{numberOfPosts} posts so far on Thinapse</div>
                {currentUser &&
                <div>
                {showFollow &&
                <div>
                    <FollowerOption />
                </div>
                }
                </div>
                }
            </div>
        </div>
        }
        </div>
    )
}



export default UserProfile;