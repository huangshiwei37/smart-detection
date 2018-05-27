import React, { Component } from 'react';
import Nav from '../components/Nav/Nav';
import SignInForm from '../components/SignInForm/SignInForm';
import SignUp from '../components/SignUp/SignUp';
import Rank from '../components/Rank/Rank';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import ImageBox from '../components/ImageBox/ImageBox';
import 'tachyons';
import './App.css';
import ReactTimeout from 'react-timeout';

class App extends Component {
	constructor(){
		super();
		this.state = {
			route: 'home',
			isSignedIn: false,
			user: {
				id: '',
				name: '',
				email: '',
				rank: 0,
        entries: 0
			},
			isImageInput: false,
			inputImageUrl: '',
			imageUrl: '',
			doesImageUrlWork: false,
			faceBoxes: []
		};
	}

  componentDidMount(){
    fetch('http://localhost:3000')
      .then(response => response.text())
      .then(data => console.log(data))
      // .catch(err => {
      //   console.log("error when fetching: ", err);
      // })
  }


	setRoute = (routeName) => {
		this.setState({route: routeName});
	}

  setIsSignedIn = (isSignedInInput) => {
    this.setState({isSignedIn: isSignedInInput})
  }

	updateUser = (inputUser) => {
		this.setState({user: 
      {
        id: inputUser.id,
        name: inputUser.name,
        email: inputUser.email,
        rank: inputUser.rank,
        entries: inputUser.entries
      }
    });
	}

	setIsImageInput = (isImageInput) => {
		this.setState({isImageInput: isImageInput});
		console.log("isImageInput: ", this.state.isImageInput);
	}

	changeInputImageUrl = (event) => {
		this.setState({inputImageUrl: event.target.value});
	}	

	setImageUrl = (imageUrl) => {
		this.setState({imageUrl: imageUrl});
		console.log("imageUrl: ", this.state.imageUrl);
	}

	setDoesImageUrlWork = (doesImageUrlWork) => {
		this.setState({doesImageUrlWork: doesImageUrlWork});
		console.log("doesImageUrlWork: ", this.state.doesImageUrlWork);
	}

	calculateFaceBoxes = (faceRegions) => {

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
	}	

	updateImage = () => {

		const imageUrl = this.state.inputImageUrl;
		if (imageUrl.length > 0){

			this.setIsImageInput(true);
			this.setImageUrl(imageUrl);

			//------------- calculateFaceBoxes -------------------------
			const Clarifai = require('clarifai');
			const clarifaiApp = new Clarifai.App({
				apiKey: 'c3ab18ea8fbd471990167f538bdac743'
			});
		
			const faceBoxes = this.state.faceBoxes;
			const calculateFaceBoxes = this.calculateFaceBoxes;

			// Be careful: keyword "this" does not work properly in Clarifai app
			clarifaiApp.models.predict('a403429f2ddf4b49b307e318f00e528b', imageUrl).then(
			  function(response) {
			    // do something with response
					console.log("response from Clarifai: ", response);

			    // example: the first face boundingBox/faceBox
			    // const boundingBox = response.outputs[0].data.regions[0].region_info.bounding_box;

	        var regions = [];
	        // if there are faces in the image (if a property exists)
			    if (response.outputs[0].data.hasOwnProperty('regions')){
			    	regions = response.outputs[0].data.regions;
			    }
			    console.log("regions from Clarifai: ", regions);

			    calculateFaceBoxes(regions);
			  },

			  function(err) {
			    // there was an error
			    console.log("Face recognition error: ", err);
			  }
			);
			//-------------End/ calculateFaceBoxes -----------
		}	//-----End/ if--------------			
	} // -----End/ updateImage-----------

	clickDetectButton = () => {

		console.log("inputImageUrl: ", this.state.inputImageUrl);

		//The input imageUrl may require some time for loading, 
		//thus we add a timeout to ensure the input imageUrl has been updated		
		setTimeout(()=>{
			this.updateImage();
		}, 1000);	

		//---------------calculate doesImageUrlWork----------------------
		// async function fetchImage(inputImageUrl) {
		// 	try{
		// 		const resp = await fetch(inputImageUrl);
		// 		console.log("response: ", resp);
		// 		if (resp.status === 200){
		// 			return true;
		// 		}		
		// 	}catch(error){
		// 		console.log("fetch error: ", error);
		// 	}
		// 	return false;
		// }

		// const doesImageUrlWork = fetchImage(this.state.inputImageUrl);

		// setTimeout(() => {
		// 	console.log("doesImageUrlWork: ", doesImageUrlWork);
		// }, 3000);		

		// this.setDoesImageUrlWork(doesImageUrlWork);
		//------------End/ doesImageUrlWork----------------------------

	}

  Body = ({route}) => {
    const {isSignedIn, user, isImageInput, inputImageUrl, imageUrl, doesImageUrlWork, faceBoxes} = this.state;
    switch (route){
      case 'home':
        return (
          <div>
            { isSignedIn?
              <Rank name={user.name} entries={user.entries}/>
              :
              <div></div>
            }
            <ImageLinkForm 
              changeInputImageUrl = {this.changeInputImageUrl}  
              clickDetectButton = {this.clickDetectButton} />
            <div>
              <ImageBox imageUrl={imageUrl} faceBoxes={faceBoxes}/>
            </div>
          </div>            
        );
      case 'signIn':
        return (
          <SignInForm 
            setIsSignedIn={this.setIsSignedIn} 
            updateUser={this.updateUser}
            setRoute={this.setRoute} />            
        );
      case 'signUp':
        return (
          <SignUp 
            setIsSignedIn={this.setIsSignedIn} 
            updateUser={this.updateUser}
            setRoute={this.setRoute} />            
        );
      default:
        return null;        
    }
  }

	render(){
		const {route, isSignedIn, user, isImageInput, inputImageUrl, imageUrl, doesImageUrlWork, faceBoxes} = this.state; 
		return (
			<div className="maxWidth center">
				<Nav 
          isSignedIn={this.state.isSignedIn} 
          user={this.state.user}
          setIsSignedIn = {this.setIsSignedIn} 
          updateUser={this.updateUser}
          setRoute={this.setRoute}/>
				<hr className="NavSeparateLine"/>
				<this.Body route={this.state.route}/>
			</div>
		);
	}
}
export default App;