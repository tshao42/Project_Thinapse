import React from 'react';
import { Link } from 'react-router-dom';
import './AboutPage.css'

function AboutInfo(){
    return(
        <div class='postContainer'>
        <h1>About this application</h1>
        <div>A Medium imitation project with minimalist interface</div>
        <div></div>
        <div class='textBody'>
            <div>Stack Used:</div>
            <ol>
                <div>Backend: Express.js, Sequelize </div>
                <div>Frontend: React.js, Redux</div>
            </ol>
                <div className='deviconsContainer'>
                    <img className='devicons' src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" />
                    <img className='devicons' src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" />
                    <img className='devicons' src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sequelize/sequelize-plain.svg" />
                    <img className='devicons' src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" />
                    <img className='devicons' src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" />
                    <img className='devicons' src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original-wordmark.svg" />
                </div>
            <div>Github Repository:
                    <a href='https://github.com/tshao42/ThoughtBubble_React_Redux' style= {{textDecoration:'none', color:'#0077B6'}}>{`   `}ThoughtBubble React/Redux</a>
            </div>
            <div>LinkedIn Profile:
                <a href='https://www.linkedin.com/in/tianyishao42' style= {{textDecoration:'none', color:'#0077B6'}}>{`   `} My LinkedIn Profile</a>
            </div>
        </div>
        </div>
    )
}

export default AboutInfo;
