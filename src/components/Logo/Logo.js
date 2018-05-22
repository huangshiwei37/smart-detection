import React from 'react';
import Tilt from 'react-tilt';
import LogoPng from './Logo.png'
import './Logo.css';


const Logo = () => {
	return(
		<Tilt className="Tilt Logo" options={{ max : 30 }} style={{ height: 60, width: 60 }} >
			<div className="Tilt-inner">
				<img alt="Logo" src={LogoPng} />
			</div>
		</Tilt>
	);
}

export default Logo;