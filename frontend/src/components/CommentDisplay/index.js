import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams, Link, useHistory } from 'react-router-dom';
import { deleteComment, getAllComments } from '../../store/comments';
import './CommentDisplay.css';

function CommentDisplay({currentUserId}){
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
            <h2>Comments:</h2>
            {Object.values(allComments).map(({User,body,id})=>(
                    <div>
                        <div className="userNamesContainer">
                            <img className="userAvatar" src={User.avatarUrl} alt="avatar"></img>
                            {User.username}
                        </div>
                        <p className="textBody">{body}</p>
                        {/* {console.log('in cycle')}
                        {console.log(`${id} no bracket`)}
                        {console.log((`${{id}} with bracket`))} */}
                        {currentUserId===User.id
                            ? <button 
                            className='editButtonSubmit'
                            id='deletingComment'
                            onClick={
                                async(e)=>{
                                    e.preventDefault();
                                    // console.log(`deleting at location... ${id}`)
                                    await dispatch(deleteComment(id)).then(()=>dispatch(getAllComments(postId)));
                                }
                            }>Delete</button>
                            :<></>
                            }
                        
                    </div>
                ))}
        </div>
    )

}



export default CommentDisplay;
