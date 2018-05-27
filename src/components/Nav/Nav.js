import React from 'react';
import Logo from '../Logo/Logo.js';
import './Nav.css';

class Nav extends React.Component {
  constructor(props){
    super(props);
  }

  clickSignOut = () => {
    const {isSignedIn, user, setIsSignedIn, updateUser, setRoute} = this.props;
    setIsSignedIn(false);
    updateUser({
      id: '',
      name: '',
      email: '',
      rank: 0,
      entries: 0
    })
  }  

  Links = () => {
    const {isSignedIn, user, setIsSignedIn, updateUser, setRoute} = this.props;
    if (isSignedIn) {
      return (
        <div>
          <p className="dib f6 mb0 mh2 i">
            Hi {user.name}
          </p>
          <p 
            onClick={this.clickSignOut} 
            className="dib f6 mb0 mh2 light-blue dim pointer i">
            Sign Out
          </p>
        </div> 
      );   
    }else{
      return (
         <div>
          <p onClick={()=>setRoute('signIn')} 
            className="dib f6 mb0 mh2 light-blue dim pointer i">
            Sign In
          </p>
          <p onClick={()=>setRoute('signUp')} 
            className="dib f6 mb0 mh2 light-blue dim pointer i">
            Sign Up
          </p>  
        </div> 
      );
    }
  }  

  render(){
    return(
      <nav className="nav">
        <div className="logo">
          <Logo />    
        </div>
        <this.Links />
      </nav>
    );
  }
}

export default Nav;