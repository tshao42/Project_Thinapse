import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, Redirect } from 'react-router-dom';
import { createPost, getAllPosts } from '../../store/posts';
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

    const updateTitle = (e) => setTitle(e.target.value);
    const updateBody = (e) => setBody(e.target.value);

    //First set the state; retrieve all
    const currentUser = useSelector((state) => state.session.user.id);

    useEffect(()=>{
        dispatch(getAllPosts());
    }, [dispatch]);

    // if (!currentUSer) return <Redirect to="/login" />;


    const handleSubmit = async(e)=> {
        e.preventDefault();
        //payload
        const payload = {
            authorId: currentUser.id,
            title,
            body,
            User: currentUser
        }

        let newPost;
        try{
            newPost = await dispatch(createPost(payload));
        } catch (error){
            console.log(error);
        }
        console.log("I am clicked");
        if (newPost){
            history.push(`/`);
        }
    }

//need cancel click



    //TODO: when not logged in, instead render a message showing not allowed to
    return(
        <div>
            <h1>Creating your thought bubble...</h1>
            <form>
                <input type="string"
                    placeholder="Give your masterpiece a title..."
                    required
                    value = {title}
                    onChange = {updateTitle}/>
                <input type="text"
                    placeholder="write your thoughts here"
                    required
                    value = {body}
                onChange = {updateBody}/>
                <button onClick = {e=>handleSubmit(e)}>Submit</button>
            </form>

        </div>
    )
}





export default WriteNew;
