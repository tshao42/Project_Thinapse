import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams, Link, useHistory } from 'react-router-dom';
import { getAllComments } from '../../store/comments';
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

    return (
        <div>
            <h2>Comments!</h2>
            {Object.values(allComments).map(({User,body})=>(
                    <div>
                        <h0>{User.username}</h0>
                        <p>{body}</p>
                        {console.log('in cycle')}
                    </div>
                ))}
        </div>
    )

}



export default CommentDisplay;
