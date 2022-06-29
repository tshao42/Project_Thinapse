import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import { getAllComments, updateComment } from '../../store/comments';
import { getAllPosts, loadSinglePost, updatePost } from '../../store/posts';
import './EditComment.css';



function EditComment({comment,setOpenEdit}){
    const postId=useParams();
    //setState
    //use dispatch
    const dispatch = useDispatch();
    
    const id = comment.id;
    const [body, setBody] = useState(comment.body);

    
    const handleSubmit =async(e)=> {
        e.preventDefault();
        //payload
        const payload = {
            id,
            body
        }

        await dispatch(updateComment(comment.id,payload))
        .then(()=>dispatch(getAllComments(comment.postId)))
        .then(()=>setOpenEdit(false));
    }




    return(
        <div>
            <h1 id="editTitlePrompt">Edit comment</h1>
            <form onSubmit={handleSubmit} id='editPostTitle'>
                <textarea type="text"
                    required
                    className='commentBox'
                    style={{width:'100%'}}
                    value = {body}
                onChange = {e=>setBody(e.target.value)}/>
                <button type="submit" className='editButtonSubmit'>Complete!</button>
            </form>
        </div>
    )
}





export default EditComment;
