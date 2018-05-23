import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = (props) => {
	return(
		<div>
			<p id="imageLinkDescription" className="mt2 mb4 tc f2 i washed-red"> Enter an image link and detect faces in the image </p>
			<div id="imageLinkForm" className="mw7 ph4 pv3 pa4-ns br4 flex justify-center center">
				<input 
					className="ma1 pa2 w-75"
					onChange={props.changeInputImageUrl}
					placeholder="http://huangshiwei.me/myLife/photos/IMG_004.jpg" 
					type="text" id="imageUrl" name="imageUrl"/>		
				<button 
					className="ma1 pa2 bg-light-blue link hover-bg-orange pointer"
					onClick={props.clickDetectButton}
					type="button">Detect</button>
			</div>
		</div>
	);		 
}

export default ImageLinkForm;