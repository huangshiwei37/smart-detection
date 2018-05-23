import React from 'react';
import './ImageBox.css';

const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'c3ab18ea8fbd471990167f538bdac743'
});

class ImageBox extends React.Component{
	//props.imageUrl
	constructor(props){
		super(props);
		this.state = {
			faceBoxes: []
		};
	}

	onFaceRegionsChange = (faceRegions) => {

		console.log("faceRegions after an image click: ", faceRegions);

		// calculate face coordinates in html: top, right, bottom, left by using predictive data
		const faceBoxes = faceRegions.map((region) => {
			const boundingBox = region.region_info.bounding_box;
			const top = boundingBox.top_row * 100;
			const right = (1 - boundingBox.right_col) * 100;
			const bottom = (1- boundingBox.bottom_row) * 100;
			const left = boundingBox.left_col * 100;
			return {top, right, bottom, left};
		});

		this.setState({faceBoxes: faceBoxes});
		console.log("faceBoxes after an image click: ", this.state.faceBoxes);
	}

	onImageClick = () => {

		const imageUrl = this.props.imageUrl;
		const faceBoxes = this.state.faceBoxes;
		const onFaceRegionsChange = this.onFaceRegionsChange;

		// Be careful: keyword "this" does not work properly in Clarifai app
		app.models.predict('a403429f2ddf4b49b307e318f00e528b', imageUrl).then(
		  function(response) {
		    // do something with response
				console.log("response from Clarifai: ", response);

		    // the first face boundingBox/faceBox
		    // const boundingBox = response.outputs[0].data.regions[0].region_info.bounding_box;

        var regions = [];
        // if there are faces in the image (if a property exists)
		    if (response.outputs[0].data.hasOwnProperty('regions')){
		    	regions = response.outputs[0].data.regions;
		    }
		    console.log("regions from Clarifai: ", regions);

		    onFaceRegionsChange(regions);
		  },

		  function(err) {
		    // there was an error
		    console.log("Face recognition error: ", err);
		  }
		);	

	}

	render(){

		const imageUrl = this.props.imageUrl;
		const faceBoxes = this.state.faceBoxes;
		console.log("faceBoxes in render: ", faceBoxes);

		var faceElements = [];
		for (var i=0; i<faceBoxes.length; i++){
			faceElements.push(
				<div 
					key={i}
					className="bounding-box" 
					style={{top: faceBoxes[i].top + '%', right: faceBoxes[i].right + '%', bottom: faceBoxes[i].bottom + '%', left: faceBoxes[i].left + '%'}}>
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