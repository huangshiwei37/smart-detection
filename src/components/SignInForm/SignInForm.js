import React from 'react';

class SignInForm extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			inputEmail: '',
			inputPassword: ''
		}
	}

	onEmailChange = (event) => {
		this.setState({inputEmail: event.target.value});
		// console.log("email: ", this.state.inputEmail);
	}

	onPasswordChange = (event) => {
		this.setState({inputPassword: event.target.value});
		// console.log("password: ", this.state.inputPassword);
	}

  clickSigninButton = (event) => {
    fetch('http://localhost:3000/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.inputEmail,
        password: this.state.inputPassword
      })
    }).then(response => {
        if (response.status === 200) {
          return response.json(); // return user = {id: '123'}
        }else{
          return {id: ''} // return user = {id: ''}
        }        
      })        
      .then(user => {
        console.log(user.id);
        if (user.id.length > 0){
          this.props.updateUser(user);
          this.props.setIsSignedIn(true);
          this.props.setRoute('home');
        }
      })
    // important: disable the default html form behaviors of browsing to a new page  
    event.preventDefault(); 
  }

	render(){
		return(
			<article className="ba b--white-20 br4 shadow-5 w5 w-third-l mw6 mv4-ns center">
				<main className="pa4 black-80">
          {/* Option1: <div> instead of <form>. otherwise it jumps to a new query link like
                  "http://localhost:3001/?email-address=john%40gmail.com&password=cookies" 
                  after clicking a button in the form
              Option2: <form> + "event.preventDefault()" to prevent the default html form behaviors 
                  of browsing to a new page 
          */}
				  <form className="measure center" onSubmit={this.clickSigninButton}> 
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f4 fw6 ph0 mh0">Sign In</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input 
					        onChange = {this.onEmailChange}
					        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					        placeholder="example@gmail.com"
					        type="email" name="email-address"  id="email-address" required="required" />
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input 
					        onChange = {this.onPasswordChange}
					        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					        placeholder="password"
					        type="password" name="password"  id="password" required="required" />
				      </div>
				      <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox" /> Remember me</label>
				    </fieldset>
				    <div className="">
               <input
                  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                  type="submit" value="Sign In" />
				    </div>
				    <div className="lh-copy mt3">
				      <a onClick = {() => this.props.setRoute('signUp')}
                 className="f6 link dim black db pointer">
                 Sign Up
              </a>
				    </div>
				  </form> 
				</main>
			</article>
		);		
	}

}

export default SignInForm;