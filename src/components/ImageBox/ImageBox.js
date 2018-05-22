import React from 'react';
import './ImageBox.css';

const ImageBox = ({imageUrl}) =>{
	return(
		<div 
			className="ba b--yellow w6 w-60-l mw6 mv3 mv4-ns pa1 center flex items-center justify-center imageBox" >
			<img src={imageUrl} alt="Image" width="auto"  height="auto" />
		</div>
	);
}

export default ImageBox;