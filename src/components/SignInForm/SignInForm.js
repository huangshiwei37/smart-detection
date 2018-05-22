import React from 'react';

class SignInForm extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			inputEmail: '',
			inputPassword: ''
		}
		console.log(props);
		console.log(this);
	}

	onEmailChange = (event) => {
		this.setState({inputEmail: event.target.value});
		console.log("email:", this.state.inputEmail);
	}

	onPasswordChange = (event) => {
		this.setState({inputPassword: event.target.value});
		console.log("password:", this.state.inputPassword);
	}

	render(){
		return(
			<article className="ba b--white-20 br4 shadow-5 w5 w-third-l mw6 mv4-ns center">
				<main className="pa4 black-80">
				  <form className="measure center">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f4 fw6 ph0 mh0">Sign In</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input 
					        onChange = {this.onEmailChange}
					        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					        placeholder="example@gmail.com"
					        type="email" name="email-address"  id="email-address" />
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input 
					        onChange = {this.onPasswordChange}
					        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					        placeholder="password"
					        type="password" name="password"  id="password" />
				      </div>
				      <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox" /> Remember me</label>
				    </fieldset>
				    <div className="">
				      <input 
					      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
					      type="submit" value="Sign in" />
				    </div>
				    <div className="lh-copy mt3">
				      <a href="#0" className="f6 link dim black db">Register</a>
				    </div>
				  </form>
				</main>
			</article>
		);		
	}

}

export default SignInForm;