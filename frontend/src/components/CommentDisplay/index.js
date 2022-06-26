import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams, Link, useHistory } from 'react-router-dom';
import { deleteComment, getAllComments } from '../../store/comments';
import './CommentDisplay.css';

function CommentDisplay(){
    const {postId} = useParams();
    console.log(`this is the postId: ${postId}`)
    const allComments = useSelector(state => {
        return state.comments.comments;
    });
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllComments(postId));
    },[dispatch])



    const [commentId, setCommentId] = useState(-1)
    // const handleDelete = async(e)=>{
    //     e.preventDefault();
    //     let deleted;
    //     try{
    //     deleted= dispatch(deleteComment(commentId));
    //     } catch (error){
    //         //handle errors
    //     }
    // };


    return (
        <div>
            <h2>Comments!</h2>
            {Object.values(allComments).map(({User,body,id})=>(
                    <div>
                        <h0>{User.username}</h0>
                        <p>{body}</p>
                        {console.log('in cycle')}
                        <button onClick={()=>dispatch(deleteComment(id))}>Delete it</button>
                    </div>
                ))}
        </div>
    )

}



export default CommentDisplay;
