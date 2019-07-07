import React from 'react';
import Loading from './Loading';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      waiting: false,
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  catchError(error) {
    if (error.code === 'auth/weak-password') {
      alert('The password is too weak.');
    } else if (error.code === 'auth/wrong-password') {
      alert('Wrong password.');
    } else {
      alert(error.message);
    }
    console.log(error);
  }

  handleSignIn(e) {
    const email = this.state.email;
    const password = this.state.password;
    if (email && password) this.handleSubmit(e);
  }

  handleSignUp(e) {
    const email = this.state.email;
    const password = this.state.password;
    if (email && password && !this.state.waiting)
    this.props.firebaseAppAuth.createUserWithEmailAndPassword(
      email, password
    ).catch(error => {
      this.catchError(error);
      this.setState({waiting: false});
    });
    this.setState({waiting: true});
    e.preventDefault();
  }

  handleSubmit(e) {
    const email = this.state.email;
    const password = this.state.password;
    if (!this.state.waiting)
    this.props.firebaseAppAuth.signInWithEmailAndPassword(
      email, password
    ).catch(error => {
      this.catchError(error);
      this.setState({waiting: false});
    });
    this.setState({waiting: true});
    e.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
	<input
	  value={this.state.email}
	  onChange={this.handleEmailChange}
	  type="email"
	  placeholder="email"
	  autoFocus
	  required
	/>
	<input
	  value={this.state.password}
	  onChange={this.handlePasswordChange}
	  type="password"
	  placeholder="password"
	  required
	/>
	<button onClick={this.handleSignIn}>Sign In</button>
	<button onClick={this.handleSignUp}>Sign Up</button>
	<button>Reset Password</button>
	{this.state.waiting && <Loading/>}
      </form>
    );
  }
}

export default SignIn;

