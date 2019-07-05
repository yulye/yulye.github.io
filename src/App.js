import React, { Component } from 'react';

//import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import withFirebaseAuth from './withFirebaseAuth'
import firebaseConfig from './firebaseConfig';
import UserForm from './UserForm';

import logo from './logo.svg';
import './App.css';

const firebaseApp = firebase.initializeApp(firebaseConfig);

const FormWrapper = ({ children }) =>
  <React.Fragment>
    {children}
  </React.Fragment>;

class App extends Component {
  render() {
    const {
      user,
      error,
      setError,
      createUserWithEmailAndPassword,
      signInWithEmailAndPassword,
      signOut,
    } = this.props;

    return (
      <div className="App">
	<header className="App-header">
	  <img
	    src={logo}
	    className="App-logo"
	    alt="logo" />
	  {
	    user
	    ? <p>Hello, {user.displayName}</p>
	    : ''
	  }

	  {
	    error ? alert(error) : ''
	  }

	  {
	    user
	    ?
	    <button onClick={signOut}>Sign out</button>
	    :
	    <FormWrapper>
	      <UserForm
		onSubmit={signInWithEmailAndPassword} />
	    </FormWrapper>
	  }
	</header>
      </div>
    );
  }
}

const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);

