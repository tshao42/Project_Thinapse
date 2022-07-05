import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { checkUserFollow } from '../../store/follow'
import { getAllPostsByUserId, loadFeedPost } from '../../store/posts';
import './Feed.css'



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
        .then(()=>(dispatch(loadFeedPost(currentUser.id))));
    }
    const redirectStyle={'fontSize':'19px', 'textDecoration': 'none', 'color': '#31293F'};
    return(
        <div>
            {currentUser &&
            <div>
                <div id='feedTitle'>Latest posts from your following users...</div>
                <div className='postContainer'>
                {Object.values(postDepo).map(({id,title,User,body})=>(
                    <div className="individualPost">
                        <div className="userNamesContainer">
                            <img className="userAvatar" src={User.avatarUrl} alt="avatar"></img>
                            <Link to={`/users/${User.id}`} style={{ color: 'black', textDecoration: 'none' }}>{User.username}</Link>
                        </div>
                        <Link to={`/posts/${id}`} style={redirectStyle}>{title}</Link>
                        <p className="previewText">{body}</p>
                    </div>
                ))}
            </div>
            </div>
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