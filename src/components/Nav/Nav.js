import React from 'react';
import Logo from '../Logo/Logo.js';
import './Nav.css';

const Nav = ({onRouteChange}) => {
	return(
		<nav className="nav">
			<div className="logo">
				<Logo />		
			</div>
			<p onClick={()=>onRouteChange('signIn')} className="f6 mb0 mh2 light-blue dim pointer i">Sign In</p>
			<p onClick={()=>onRouteChange('home')} className="f6 mb0 mh2 light-blue dim pointer i">Sign Out</p>
		</nav>
	);
}

export default Nav;