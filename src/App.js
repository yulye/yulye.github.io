import React from 'react';
import './App.css';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';
import SignIn from './SignIn';
import Loading from './Loading';
import User from './User';

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();

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
    });
  }

  render() {
    const user = this.state.user;
    if (user === 0) {
      return <Loading/>;
    } else if (user) {
      return <User
	user={user}
	firebaseAppAuth={firebaseAppAuth}
      />;
    }
    return <SignIn firebaseAppAuth={firebaseAppAuth}/>;
  }
}

export default App;

