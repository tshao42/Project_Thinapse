import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, Redirect } from 'react-router-dom';
import { getAllPosts, createPost } from '../../store/posts';
import './WriteNew.css';


function WriteNew(){

    //set Original State
    //contents:
    //title
    //body
    //authorId will be grabbed from session

    //setState
    const posts = useSelector(state => {
        return state.posts.posts;
    });
    const dispatch = useDispatch();
    const history = useHistory();

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    // const updateTitle = (e) => setTitle(e.target.value);
    // const updateBody = (e) => setBody(e.target.value);

    //First set the state; retrieve all
    const currentUser = useSelector((state) => state.session.user);

    useEffect(()=>{
        dispatch(getAllPosts());
    }, [dispatch]);

    // if (!currentUSer) return <Redirect to="/login" />;

    //NEED TO IMPLEMENT
    //ERROR HANDLING?
    //but since they're required, wondering if it's necessary

    const handleSubmit =async(e)=> {
            e.preventDefault();
            const payload = {
                authorId: currentUser.id,
                title,
                body,
                User: currentUser
            }
            // console.log(`handleSubmit here ${payload}`);
            await dispatch(createPost(payload)).then(()=>dispatch(getAllPosts()));
            history.push(`/`)
    };


//need cancel click



    //TODO: when not logged in, instead render a message showing not allowed to
    return(
        <div className='pageContainer'>
            <h1 id='writePageTitle'>Creating your thought bubble...</h1>
            <br/>
            <form onSubmit={handleSubmit} id='writeNewForm'>
                <textarea type="string"
                    placeholder="Give your post a name..."
                    required
                    id='newPostTitle'
                    value = {title}
                    onChange = {e=>setTitle(e.target.value)}/>
                <textarea type="text"
                    placeholder="What are you thinking?"
                    required
                    id = 'newPostBody'
                    value = {body}
                    onChange = {e=>setBody(e.target.value)}/>
                <button type="submit" id='writeNewSubmit'>Submit</button>
            </form>

        </div>
    )
}





export default WriteNew;
