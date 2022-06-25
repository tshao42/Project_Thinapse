import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllPosts } from '../../store/posts';
import './ArticleList.css';


function ArticleList(){
    const dispatch = useDispatch();
    //getting all post
    const allPosts = useSelector(state => {
        return state.posts.posts;
    });
    const allUsers = useSelector(state=>{
        return state
    })
    useEffect(() => {
        dispatch(getAllPosts());
    },[dispatch])
    return(
        <div>
            {console.log(`Are we getting all posts? ${allPosts}`)}
            <h1>ThoughtBubbleDivider!</h1>
            <h2>The posts we are bringing you:</h2>
            <ul>
                {Object.values(allPosts).map(({id,title,user})=>(
                    <div>
                        <h2>{id}</h2>
                        <h3>{user.username}</h3>
                        <h2>{title}</h2>
                    </div>
                ))}
            </ul>
        </div>
    );
}


export default ArticleList;
