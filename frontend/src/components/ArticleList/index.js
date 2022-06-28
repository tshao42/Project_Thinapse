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
    const redirectStyle={'font-size':'19px', 'text-decoration': 'none', 'color': 'black'};
    return(
        <div>
            {/* {console.log(`Are we getting all posts? ${allPosts}`)} */}
            <div className="frontPage">
                <div id="slogan">Bubbles can be round...or in other shapes
                    <div id="sub-Slogan">Catalyze the next thoughts chain reaction...In the way you like</div>
                </div>
                <img src="https://i.imgur.com/FCj4MH1.png" id="frontPagePic" alt="node" />
            </div>
            <div className="postListContainer">
            <h3 id="subdivisionTitle">What others are thinking...</h3>
            <ul>
                {Object.values(allPosts).map(({id,title,User,body})=>(
                    <div className="individualPost">
                        <div className="userNamesContainer">
                            <img className="userAvatar" src={User.avatarUrl} alt="avatar"></img>
                            {User.username}
                        </div>
                        <NavLink to={`/posts/${id}`} style={redirectStyle}>{title}</NavLink>
                        <p className="previewText">{body}</p>
                        {/* {console.log('in cycle')} */}
                    </div>
                ))}
                <script src="https://s3-us-west-2.amazonaws.com/kaboodle/kaboodle.js" type="text/javascript"></script>
                {/* {console.log('out of cycle')} */}
            </ul>
            </div>
        </div>
    );
}


export default ArticleList;
