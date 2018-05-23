import React from 'react';
import Logo from '../Logo/Logo.js';
import './Nav.css';

const Nav = ({setRoute}) => {
	return(
		<nav className="nav">
			<div className="logo">
				<Logo />		
			</div>
			<p onClick={()=>setRoute('signIn')} 
        className="f6 mb0 mh2 light-blue dim pointer i">
        Sign In
      </p>
			<p onClick={()=>setRoute('home')} 
        className="f6 mb0 mh2 light-blue dim pointer i">
        Sign Out
      </p>
		</nav>
	);
}

export default Nav;