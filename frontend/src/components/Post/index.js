import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams, Link, useHistory } from 'react-router-dom';
import { deletePost, getAllPosts, loadSinglePost } from '../../store/posts';
import EditPost from '../EditPost';
import './Post.css';


function SinglePost(){
    //get the ID of the post from the parameter
    const { postId } = useParams();

    //use dispatch
    const dispatch = useDispatch();
    const history = useHistory();
    //get the one post
    const posts = useSelector(state => {
        return state.posts.posts;
    });
    const post = Object.values(useSelector(state=>state.posts.posts))

    useEffect(()=>{},[]);
    useEffect(() => {
        dispatch(loadSinglePost(postId));
    },[dispatch])

    const handleDelete = async (e)=>{
        e.preventDefault();
        let deleted;
        try{
        deleted= dispatch(deletePost(postId));
        } catch (error){
            //handle errors
        } finally{
        if (deleted){
            history.push(`/`);
        }
    }
    }
    return(
        <div>
            {Object.values(posts).map(({title,User,body,id})=>(
                <div>
                    <h3>{User.username}</h3>
                    <h2>{title}</h2>
                    <p>{body}</p>
                    <EditPost post={{title,body,id, User}} User={User} />
                    <button onClick={handleDelete}>Delete it</button>
                </div>
            ))}
        </div>
    );
}


export default SinglePost;
