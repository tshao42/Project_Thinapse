import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    const notFoundStyle={textDecoration: 'none',color:'black', fontFamily:'forma-djr-text'};
    const pageStyle={padding: '10%'}
    return(
    <div style={pageStyle}>
        <h1 className='individualPost'>Oops! 404 - Not Found!</h1>
        <Link to="/" id='goHomePage' style={notFoundStyle}>Go Home</Link>
    </div>
    );
    }
export default NotFound;