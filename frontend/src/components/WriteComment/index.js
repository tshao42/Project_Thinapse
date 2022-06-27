import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams, useHistory } from 'react-router-dom';
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
