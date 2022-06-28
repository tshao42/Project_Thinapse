import React from 'react';
import { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams, Link, useHistory } from 'react-router-dom';
import { deletePost, getAllPosts, loadSinglePost } from '../../store/posts';
import EditPost from '../EditPost';
import CommentDisplay from '../CommentDisplay';
import WriteComment from '../WriteComment'
import './Post.css';


function SinglePost(){
    //get the ID of the post from the parameter
    const { postId } = useParams();

    //use dispatch
    const dispatch = useDispatch();
    const history = useHistory();

    //get the one post
    const post = useSelector(state => {
        return state.posts.posts;
    });
    
    const currentUser = useSelector((state) => state.session.user);

    const [loaded, setLoaded] = useState(false);
    // const {title, body, id, User} = post;

    useEffect(()=>{
        dispatch(getAllPosts());
        hydrating();
    }, [dispatch]);

    const hydrating = async ()=>{
        await dispatch(loadSinglePost(postId)).then(()=>setLoaded(true));
    }
    const handleDelete = async (e)=>{
        e.preventDefault();
        await dispatch(deletePost(postId)).then(()=>history.push(`/`));
    }
    const belongsToUser=(currentUser.id===post[postId].User.id);
    return(
        <div>
            {loaded &&
                <div className="postContainer">
                    <div className="userNamesContainer">
                    <img className="userAvatar" src={post[postId].User.avatarUrl} alt="avatar"></img>
                        {post[postId].User.username}
                    </div>
                    <h1>SinglePost {post[postId].User.username}</h1>
                    <h3>{post[postId].User.username}</h3>
                    <h2>{post[postId].title}</h2>
                    <p>{post[postId].body}</p>
                    {belongsToUser && 
                    <>
                    <EditPost post= {post[postId]} />
                    <button onClick={handleDelete}>Delete it</button>
                    </>
                    }
                    <CommentDisplay />
                    {currentUser.id &&
                    <WriteComment postId={postId} />
                    }
                </div>
            }
        </div>
    );
}


export default SinglePost;
