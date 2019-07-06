import React from 'react';
import './App.css';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();

function Loading() {
  return <div className="loading">loading... please wait.</div>;
}

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedOut: false,
    };
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleSignOut(e) {
    firebaseAppAuth.signOut();
    this.setState({
      signedOut: true,
    });
  }

  render() {
    return (
      <div>
	<div>Hi, {this.props.user.displayName}!</div>
	<button onClick={this.handleSignOut}>Sign Out</button>
	{this.state.signedOut && <Loading/>}
      </div>
    );
  }
}

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      signingIn: false,
      wrongPassword: false,
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  handleSignIn(e) {
    const email = this.state.email;
    const password = this.state.password;
    if (email && password) this.handleSubmit(e);
  }

  handleSubmit(e) {
    const email = this.state.email;
    const password = this.state.password;
    if (!this.state.signingIn)
    firebaseAppAuth.signInWithEmailAndPassword(
      email, password
    ).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
	alert('Wrong password.');
	this.setState({
	  wrongPassword: true,
	});
      } else {
	alert(errorMessage);
      }
      console.log(error);
      this.setState({
	signingIn: false,
      });
    });
    this.setState({
      signingIn: true,
    });
    e.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
	<input
	  value={this.state.email}
	  onChange={this.handleEmailChange}
	  name="email"
	  type="email"
	  placeholder="email"
	  autoFocus
	  required
	/>
	<input
	  value={this.state.password}
	  onChange={this.handlePasswordChange}
	  name="password"
	  type="password"
	  placeholder="password"
	  required
	/>
	<button onClick={this.handleSignIn}>Sign In</button>
	<button>Sign Up</button>
	<button>Reset Password</button>
	{this.state.signingIn && <Loading/>}
      </form>
    );
  }
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: 0,
    };
  }

  componentDidMount() {
    firebaseAppAuth.onAuthStateChanged((user) => {
      this.setState({user: user});
      console.log(user);
    });
  }

  render() {
    const user = this.state.user;
    let view;
    if (user === 0) {
      view = <Loading/>;
    } else if (user) {
      view = <User user={user}/>;
    } else {
      view = <SignIn/>;
    }
    return view;
  }
}

export default App;

