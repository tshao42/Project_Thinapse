import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import { getAllPosts, loadSinglePost, updatePost } from '../../store/posts';
import './EditPost.css';



function EditPost({post}){

    //setState
    const { postId } = useParams();

    //use dispatch
    const dispatch = useDispatch();
    const history = useHistory();

    const currentUser = useSelector((state) => state.session.user);
    const [title, setTitle] = useState(post.title);
    const [body, setBody] = useState(post.body);
    const [User, setUser] = useState(post.User);
    const [errors, setErrors] = useState([]);

    // const updateTitle = (e) => setTitle(e.target.value);
    // const updateBody = (e) => setBody(e.target.value);

    //First set the state; retrieve all
    // const currentUser = useSelector((state) => state.session.user);

    // if (!currentUSer) return <Redirect to="/login" />;

    //NEED TO IMPLEMENT
    //ERROR HANDLING?
    //but since they're required, wondering if it's necessary
    const handleSubmit =async(e)=> {
        e.preventDefault();
        //payload
        const payload = {
            authorId: currentUser.id,
            title,
            body,
            User
        }
        setErrors([]);
        await dispatch(updatePost(postId,payload)).then(()=>dispatch(loadSinglePost(postId)));
                //waiting for it to completely complete before doing anything
    }

//need cancel click



    //TODO: when not logged in, instead render a message showing not allowed to
    return(
        <div>
            <h1 id="editTitlePrompt">Made some typos? Fix them here...</h1>
            <form onSubmit={handleSubmit} id='editPostTitle'>
                <textarea type="string"
                    required
                    value = {title}
                    id = 'editTitle'
                    onChange = {e=>setTitle(e.target.value)}/>
                <textarea type="text"
                    required
                    id='editBody'
                    value = {body}
                onChange = {e=>setBody(e.target.value)}/>
                <button type="submit" id='smallEditButtons'>Fix it!</button>
            </form>
        </div>
    )
}





export default EditPost;
