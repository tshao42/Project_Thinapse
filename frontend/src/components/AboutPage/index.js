import React from 'react';
import { Link } from 'react-router-dom';
import './AboutPage.css'

function AboutInfo(){
    return(
        <div class='postContainer'>
        <h1>ThoughtBubble Info</h1>
        <ul class='textBody'>
            <div>Stack Used:</div>
            <ol>
                <div>Backend: Express.js, Sequelize </div>
                <div>Frontend: React.js, React-Redix</div>
            </ol>
            <div>Github Repository:
                    <a href='https://github.com/tshao42/ThoughtBubble_React_Redux' style= {{textDecoration:'none', color:'#0077B6'}}>{`   `}ThoughtBubble React/Redux</a>
            </div>
            <div>LinkedIn Profile:
                <a href='https://www.linkedin.com/in/tianyi-s-9345b213a/' style= {{textDecoration:'none', color:'#0077B6'}}>{`   `} My LinkedIn Profile</a>
            </div>
        </ul>
        </div>
    )
}

export default AboutInfo;
