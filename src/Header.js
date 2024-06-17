
import React, { useContext } from 'react';
import './styles.css'
import usePage from './context/usePage';

export default function Header() {
    const { setCurrentPage } = usePage();
    
    function handleClick(page) {
        //console.log('page button clicked', page)
        setCurrentPage(page)

    }
    return<>
        <div className="header">
            <div className="headerButtons">
                <button onClick={() => handleClick('home')}>Home</button>
                <button onClick={() => handleClick('projects')}>Projects</button>
                <button onClick={() => handleClick('skills')}>Skills</button>
                <button onClick={() => handleClick('aboutMe')}>About Me</button>
                <button> <a href="https://www.linkedin.com/in/emmajaneford/">LinkedIn</a></button>
            </div>
       </div>
  </>
}