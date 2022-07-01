import React from 'react';
import { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams, Link, useHistory } from 'react-router-dom';
import { deletePost, getAllPosts, loadSinglePost } from '../../store/posts';
import EditPost from '../EditPost';
import CommentDisplay from '../CommentDisplay';
import WriteComment from '../WriteComment'
import restoreUser from '../../store/session'
import './Post.css';
import NotFound from '../NotFound';


function SinglePost(){
    //get the ID of the post from the parameter
    const { postId } = useParams();

    //use dispatch
    const dispatch = useDispatch();
    const history = useHistory();
    let [openEdit, setOpenEdit] = useState(false);

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
        await dispatch(loadSinglePost(postId))
        .then(()=>setLoaded(true));
        };

    const handleDelete = async (e)=>{
        e.preventDefault();
        await dispatch(deletePost(postId))
        .then(()=>history.push(`/`));
    }


    const setOpen = ()=>{
        if (openEdit) setOpenEdit(false);
        if (!openEdit) setOpenEdit(true);
    }



    return(
        <div>
            {loaded &&
                <div className="postContainer">
                    <div className="userNamesContainer">
                    <img className="userAvatar" src={post[postId].User.avatarUrl} alt="avatar"></img>
                        <Link to={`/users/${post[postId].User.id}`} style={{color:'black', textDecoration: 'none'}}>{post[postId].User.username}</Link>
                    </div>
                    <h1>SinglePost {post[postId].User.username}</h1>
                    <h3>{post[postId].User.username}</h3>
                    <h2>{post[postId].title}</h2>
                    <p className="textBody">{post[postId].body}</p>
                    {!currentUser
                    ? <></>
                    : <>{currentUser.id===post[postId].authorId ?
                        <div className='editOptions'>
                            {/*want wo make it a side bar??*/}
                        <button id='edit-post' onClick={setOpen} className='smallEditButtons' name='edit-toggle'>Edit</button> 
                            {openEdit
                            ?  <EditPost post= {post[postId]} />
                            :  <></>
                            }
                            <button className='smallEditButtons' onClick={handleDelete}>Delete</button>
                        </div>
                        :<></>
                    }
                    </>

                }
                {currentUser &&
                    <CommentDisplay currentUserId={currentUser.id}/>
                }
                {!currentUser &&
                    <CommentDisplay currentUserId={0} />
                }
                    {currentUser &&     //if logged in
                        <WriteComment postId={postId} />
                    }
                </div>
            }
            {!loaded &&
            <NotFound />
            }
        </div>
    );
};


export default SinglePost;
