import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllPosts } from '../../store/posts';
import './Home.css';


function Homepage(){
    const dispatch = useDispatch();
const allPosts = useSelector(state => {
    return state.posts.posts.map(postId => state.posts[postId]);
});

    useEffect(() => {
        dispatch(getAllPosts())
        console.log(`Line17 ${allPosts}`);
    },[dispatch])

    console.log(`allPosts here: ${allPosts}`)

    return allPosts.map((post)=>
        <div>
            <h1>ThoughtBubbleDivider!</h1>
                <ul>
                    <h2>{post.id}</h2>
                    <h3>{post.title}</h3>
                    <p> {post.body}</p>
                </ul>
        </div>
    );
}


export default Homepage;
