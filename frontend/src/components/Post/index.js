import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getAllPosts, loadSinglePost } from '../../store/posts';
import './Post.css';


function SinglePost(){
    //get the ID of the post from the parameter
    const { postId } = useParams();

    //use dispatch
    const dispatch = useDispatch();
    //get the one post
    const posts = useSelector(state => {
        return state.posts.posts;
    });
    useEffect(() => {
        dispatch(loadSinglePost(postId));
    },[dispatch, postId])
    return(
        <div>
            {Object.values(posts).map(({title,User,body})=>(
                <div>
                    <h3>{User.username}</h3>
                    <h2>{title}</h2>
                    <p>{body}</p>
                </div>
            ))}
        </div>
    );
}


export default SinglePost;
