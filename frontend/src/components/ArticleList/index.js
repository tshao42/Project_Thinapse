import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link, Redirect, useHistory } from 'react-router-dom';
import { getAllPosts } from '../../store/posts';
import './ArticleList.css';


function ArticleList(){
    const dispatch = useDispatch();
    const history = useHistory();
    //getting all post
    const allPosts = useSelector(state => {
        return state.posts.posts;
    });


    useEffect(()=>{},[]);
    useEffect(() => {
        dispatch(getAllPosts());
    },[dispatch])
    const redirectStyle = {
        'fontSize': '19px', 'textDecoration': 'none', 'color': '#5AB9EA'};
    return(
        <div>
            <div className="frontPage">
                <div id="slogan">Think. React.<br />Now.
                    <p><br></br></p>
                    <div id="sub-Slogan">Catalyze the next thoughts chain reaction...</div>
                </div>
                <img src="https://i.imgur.com/FCj4MH1.png" id="frontPagePic" alt="node" />
            </div>
            <div className="postListContainer">
            <h3 id="subdivisionTitle">What others are thinking...</h3>
            <ul className='latestDisplay'>
                {Object.values(allPosts).map(({id,title,User,body})=>(
                    <div className="individualPost">
                        <div className="userNamesContainer">
                            <img className="userAvatar" src={User.avatarUrl} alt="avatar"></img>
                            <Link to={`/users/${User.id}`} style={{ color: '#5AB9EA', textDecoration: 'none' }}>{User.username}</Link>
                        </div>
                        <NavLink to={`/posts/${id}`} style={redirectStyle}>{title}</NavLink>
                        <p className="previewText">{body}</p>
                    </div>
                ))}
            </ul>
            </div>
        </div>
    );
}


export default ArticleList;
