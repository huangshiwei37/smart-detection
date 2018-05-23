import React from 'react';
import './ImageBox.css';


class ImageBox extends React.Component{
	//props.imageUrl, props.faceBoxes
	constructor(props){
		super(props);
	}

	render(){
		const imageUrl = this.props.imageUrl;
		const faceBoxes = this.props.faceBoxes;
    console.log("imageUrl in ImageBox: ", imageUrl);
		console.log("faceBoxes in ImageBox: ", faceBoxes);

		var faceElements = [];
		for (var i=0; i<faceBoxes.length; i++){
			faceElements.push(
				<div 
					key={i}
					className="bounding-box" 
					style={{top: faceBoxes[i].top + '%', right: faceBoxes[i].right + '%', 
                  bottom: faceBoxes[i].bottom + '%', left: faceBoxes[i].left + '%'}}>
				</div>
			);
		}	

		return(
			<div 
				className="ba b--gold shadow-1 w6 w-60-l mw6 mv3 mv4-ns pa1 center flex items-center justify-center imageBox" >
				<button onClick={this.onImageClick} className="pointer">
					<img src={imageUrl} alt="Image" width="auto"  height="auto" />
				</button>
				{faceElements}			
			</div>
		);
	}
}

export default ImageBox;