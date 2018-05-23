import React from 'react';
import ReactTimeout from 'react-timeout';
import './ImageLinkForm.css'

class ImageLinkForm extends React.Component{

	//props.onIsImageInput, props.onImageUrlChange
	//props.onDoesImageUrlWork
	constructor(props){
		super(props);
		this.state = {
			imageUrlInput: ''
		}
		console.log("props: ", props);
		console.log("this: ", props);
	}

	onImageUrlInput = (event) => {
		this.setState({imageUrlInput: event.target.value});
	}

	onClickDetect = () => {

		console.log("imageUrlInput: ", this.state.imageUrlInput);
		console.log("imageUrl length: ", this.state.imageUrlInput.length);

		if (this.state.imageUrlInput.length > 0){
			this.props.onIsImageInput(true);
			this.props.onImageUrlChange(this.state.imageUrlInput);
		}	

		async function fetchImage(imageUrlInput) {
			try{
				const resp = await fetch(imageUrlInput);
				console.log("response: ", resp);
				if (resp.status === 200){
					return true;
				}		
			}catch(error){
				console.log("fetch error: ", error);
			}
			return false;
		}

		const doesImageUrlWork = fetchImage(this.state.imageUrlInput);

		setTimeout(() => {
			console.log("doesImageUrlWork: ", doesImageUrlWork);
		}, 3000);		

		this.props.onDoesImageUrlWork(doesImageUrlWork);

	}

	render(){
		return(
			<div>
				<p id="imageLinkDescription" className="mt2 mb4 tc f2 i washed-red"> Enter an image link and detect faces in the image </p>
				<div id="imageLinkForm" className="mw7 ph4 pv3 pa4-ns br4 flex justify-center center">
					<input 
						className="ma1 pa2 w-75"
						onChange={this.onImageUrlInput}
						placeholder="http://huangshiwei.me/myLife/photos/IMG_004.jpg" 
						type="text" id="imageUrl" name="imageUrl"/>		
					<button 
						className="ma1 pa2 bg-light-blue link hover-bg-orange pointer"
						onClick={this.onClickDetect}
						type="button">Detect</button>
				</div>
			</div>
		);		
	}
}

export default ImageLinkForm;