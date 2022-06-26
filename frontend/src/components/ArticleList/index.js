import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { getAllPosts } from '../../store/posts';
import './ArticleList.css';


function ArticleList(){
    const dispatch = useDispatch();
    //getting all post
    const allPosts = useSelector(state => {
        return state.posts.posts;
    });

    const posts = Object.values(useSelector(state=>state.posts.posts))

    useEffect(()=>{},[]);
    useEffect(() => {
        dispatch(getAllPosts());
    },[dispatch])
    return(
        <div>
            {console.log(`Are we getting all posts? ${allPosts}`)}
            <h4>ThoughtBubbleDivider!</h4>
            <h3>The posts we are bringing you:</h3>
            <ul>
                {Object.values(allPosts).map(({id,title,User})=>(
                    <div>
                        <h1>{id}</h1>
                        <p>{User.username}</p>
                        <h1>{title}</h1>
                        {console.log('in cycle')}
                    </div>
                ))}
                {console.log('out of cycle')}
            </ul>
        </div>
    );
}


export default ArticleList;
