import React from 'react';
import ReactTimeout from 'react-timeout'

class ImageLinkForm extends React.Component{

	//props.onIsImageInput, props.onImageUrlChange
	//props.onDoesImageUrlWork
	constructor(props){
		super();
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
			<div className="flex justify-center">
				<input 
					onChange={this.onImageUrlInput}
					type="text" id="imageUrl" name="imageUrl"/>		
				<button 
					onClick={this.onClickDetect}
					type="button">Detect</button>
			</div>
		);		
	}
}


export default ImageLinkForm;