import React from 'react';

class SignUp extends React.Component {
	constructor(props){
		super(props);
		this.state = {
      signUpState: 0, // signing up is in progress
      inputName: '',
			inputEmail: '',
			inputPassword: ''
		}
	}

  onNameChange = (event) => {
    this.setState({inputName: event.target.value});
    // console.log("name: ", this.state.inputName);
  }

	onEmailChange = (event) => {
		this.setState({inputEmail: event.target.value});
		// console.log("email: ", this.state.inputEmail);
	}

	onPasswordChange = (event) => {
		this.setState({inputPassword: event.target.value});
		// console.log("password: ", this.state.inputPassword);
	}

  clickSignUpButton = (event) => {
    fetch('http://localhost:3000/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: this.state.inputName,
        email: this.state.inputEmail,
        password: this.state.inputPassword
      })
    }).then(response => {
        console.log('response: ', response);
        if (response.status === 200) {
          this.setState({signUpState: 1}); // signing up is approved 
        }else{
          this.setState({signUpState: -1}); // signing up is rejected due to the bad connection 
        }        
      })
    // important: disable the default html form behaviors of browsing to a new page  
    event.preventDefault(); 
  }

  SignUpInProgress = () => {
    return (
      <article className="ba b--white-20 br4 shadow-5 w5 w-third-l mw6 mv4-ns center">
        <main className="pa4 black-80">
          <form className="measure center" onSubmit={this.clickSignUpButton}> 
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f4 fw6 ph0 mh0">Sign Up</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="userName">Name</label>
                <input 
                  onChange = {this.onNameChange}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  placeholder="John"
                  type="text" name="userName"  id="userName" required="required"/>
              </div>              
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input 
                  onChange = {this.onEmailChange}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  placeholder="example@gmail.com"
                  type="email" name="email-address"  id="email-address" required="required"/>
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input 
                  onChange = {this.onPasswordChange}
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  placeholder="password"
                  type="password" name="password"  id="password" required="required"/>
              </div>
              <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox" /> Remember me</label>
            </fieldset>
            <div className="">
               <input
                  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                  type="submit" value="Sign Up" />
            </div>
          </form> 
        </main>
      </article>    
    );
  }

  SignUpBody = () => {
    switch (this.state.signUpState) {
      case 1: /* Signing up is approved */
        return (
          <div>
            <p className="tc f4 white mt4 mb2">
              Thank you! You have signed up successfully. Click the button to sign in.
            </p>
            <div className="tc">
              <button
                onClick = {() => this.props.setRoute('signIn')}
                className="mt3 pa2 br3 pointer">
                Sign In
              </button>
            </div>
          </div>
        );
      case -1: /* Signing up is rejected */
        return (
          <div>
            <p className="tc f4 white mt4 mb2">
              Sorry! You have NOT signed up successfully. Please try it again later.
            </p>
            <div className="tc">
              <button
                onClick = {() => this.props.setRoute('home')}
                className="mt3 pa2 br3 pointer">
                Home
              </button>
            </div>
          </div>
        );
      default: /* Signing up is in progress */
        return (
          <this.SignUpInProgress />
        );
    }
  }

	render(){         
		return(
      <this.SignUpBody />
		);		
	}

}

export default SignUp;