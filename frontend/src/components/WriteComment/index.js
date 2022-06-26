import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import './WriteComment.css';
import { createComment } from '../../store/comments';
import { getAllComments } from '../../store/comments';



function WriteComment(){
    const {postId} = useParams();
    const dispatch = useDispatch();
    const [body, setBody] = useState("");
    const currentUser = useSelector((state) => state.session.user);
    const handleSubmit = (e)=>{
        e.preventDefault();
        //payload
        const payload = {
            userId: currentUser.id,
            postId,
            body
        }
        console.log(`handleSubmit here ${payload}`);
            dispatch(createComment(payload));
//error handling
    }

    return(
        <div>
            <h1>Tell the author what you think!</h1>
            <h1>PostId here: {postId}</h1>
            <form onSubmit={handleSubmit}>
                <input type="text"
                placeholder='tell them what you think...'
                required
                value = {body}
                onChange = {e=>setBody(e.target.value)} />
                <button type="submit">Submit comment!</button>
            </form>
        </div>
    )


}



export default WriteComment;
