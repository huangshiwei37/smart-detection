import React, { Component } from 'react';
import Nav from '../components/Nav/Nav';
import SignInForm from '../components/SignInForm/SignInForm';
import Rank from '../components/Rank/Rank';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import ImageBox from '../components/ImageBox/ImageBox';
import 'tachyons'
import './App.css'

class App extends Component {
	constructor(){
		super();
		this.state = {
			route: 'home',
			isSignedIn: false,
			user: {
				id: '',
				name: 'Shiwei',
				email: 'huangshiwei37@gmail.com',
				rank: 0
			},
			isImageInput: false,
			imageUrl: '',
			doesImageUrlWork: false
		};
	}

	onRouteChange = (routeName) => {
		this.setState({route: routeName});
	}

	onIsUserSignedInChange = (isSignedIn) => {
		this.setState({isSignedIn: isSignedIn});
	}

	onUserChange = (user) => {
		this.setState({user: user});
	}

	onIsImageInput = (isImageInput) => {
		this.setState({isImageInput: isImageInput});
		console.log("isImageInput: ", this.state.isImageInput);
	}

	onImageUrlChange = (imageUrl) => {
		this.setState({imageUrl: imageUrl});
		console.log("imageUrl: ", this.state.imageUrl);
	}

	onDoesImageUrlWork = (doesImageUrlWork) => {
		this.setState({doesImageUrlWork: doesImageUrlWork});
		console.log("doesImageUrlWork: ", this.state.doesImageUrlWork);

		if (this.state.doesImageUrlWork){
			console.log("true?");
		}
	}

	render(){
		const {route, isSignedIn, user, isImageInput, imageUrl, doesImageUrlWork} = this.state;
		return (
			<div className="maxWidth center">
				<Nav onRouteChange={this.onRouteChange}/>
				<hr className="NavSeparateLine"/>
				{ 
					route === 'home'?
						<div>			
							<Rank name={user.name} rank={user.rank}/>	
							<ImageLinkForm 
								onIsImageInput = {this.onIsImageInput}	
								onImageUrlChange = {this.onImageUrlChange} 
								onDoesImageUrlWork = {this.onDoesImageUrlWork} />
							<div>
								<ImageBox imageUrl={imageUrl} />
							</div>
						</div>
					:
					<SignInForm 
						onIsSignedInChange={this.onIsSignedInChange} 
						onUserChange={this.onUserChange} />
				}
			</div>
		);
	}
}
export default App;