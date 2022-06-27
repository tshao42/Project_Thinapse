import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams, Link, useHistory } from 'react-router-dom';
import { deleteComment, getAllComments } from '../../store/comments';
import './CommentDisplay.css';

function CommentDisplay(){
    const {postId} = useParams();
    // console.log(`this is the postId: ${postId}`)
    const allComments = useSelector(state => {
        return state.comments.comments;
    });
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllComments(postId));
    },[dispatch])



    // const [commentId, setCommentId] = useState(-1)
    // const handleDelete = async(e)=>{
    //     e.preventDefault();

    //     await dispatch(deleteComment(commentId).then(()=>dispatch.getAllComments(postId)));
    // };


    return (
        <div>
            <h2>Comments!</h2>
            {Object.values(allComments).map(({User,body,id})=>(
                    <div>
                        <h0>{User.username}</h0>
                        <p>{body}</p>
                        <p>{id}</p>
                        {/* {console.log('in cycle')}
                        {console.log(`${id} no bracket`)}
                        {console.log((`${{id}} with bracket`))} */}
                        <button onClick={
                            async(e)=>{
                                e.preventDefault();
                                console.log(`deleting at location... ${id}`)
                                await dispatch(deleteComment(id)).then(()=>dispatch(getAllComments(postId)));
                            }
                        }>Delete it</button>
                    </div>
                ))}
        </div>
    )

}



export default CommentDisplay;
