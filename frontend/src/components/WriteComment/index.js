import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams, useHistory, Redirect } from 'react-router-dom';
import './WriteComment.css';
import { createComment } from '../../store/comments';
import { getAllComments } from '../../store/comments';
import { loadSinglePost } from '../../store/posts';



function WriteComment({postId}){
    const dispatch = useDispatch();
    const history = useHistory();
    const [body, setBody] = useState("");
    const currentUser = useSelector((state) => state.session.user);


    // console.log(`postId from WriteComment ${postId}`)
    const handleSubmit = async (e)=>{
        e.preventDefault();
        //payload
        const payload = {
            userId: currentUser.id,
            postId,
            body
        }
        // console.log(`handleSubmit here ${payload}`);
        await dispatch(createComment(payload)).then(()=>dispatch(getAllComments(postId)));
        setBody("");
//error handling
    }

    return(
        <div>
            {currentUser &&
            <div>
                <h1 id='commentPromptTitle'>Leave a comment!</h1>
                <form onSubmit={handleSubmit}>
                    <textarea type="text"
                    placeholder='anything to say...'
                    required
                    value = {body}
                    onChange = {e=>setBody(e.target.value)} 
                    id='commentBox'
                    />
                    <button type="submit" className='editButtonSubmit' >Submit comment!</button>
                </form>
            </div>
            }                
        </div>
    )


}



export default WriteComment;
