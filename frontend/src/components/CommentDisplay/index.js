import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams, Link, useHistory } from 'react-router-dom';
import { deleteComment, getAllComments } from '../../store/comments';
import EditComment from '../EditComment';
import './CommentDisplay.css';

function CommentDisplay({currentUserId}){
    const {postId} = useParams();
    const allComments = useSelector(state => {
        return state.comments.comments;
    });
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllComments(postId));
    },[dispatch])

    let [openEdit, setOpenEdit] = useState(false);


    const setOpenEditComment = ()=>{
        if (openEdit) setOpenEdit(false);
        if (!openEdit) setOpenEdit(true);
    }


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
                            <Link to={`/users/${User.id}`} style={{textDecoration:'none'}}>{User.username}</Link>
                        </div>
                        <p className="textBody">{body}</p>
                        {currentUserId===User.id
                            ? 
                            <div className="editOptions" id="commenteditOptions">
                                <button 
                                className='smallEditButtons'
                                id='deletingComment'
                                onClick={
                                    async(e)=>{
                                        e.preventDefault();
                                        await dispatch(deleteComment(id)).then(()=>dispatch(getAllComments(postId)));
                                    }
                                }>Delete</button>
                                <button
                                className='smallEditButtons'
                                id='editingCommentOpener'
                                onClick={
                                    setOpenEditComment
                                }>Edit
                                </button>
                                {openEdit
                                ? <EditComment comment={allComments[id]} setOpenEdit={setOpenEdit}/>
                                : <></>
                                }
                            </div>
                            :<></>
                            }
                        
                    </div>
                ))}
        </div>
    )

}



export default CommentDisplay;
