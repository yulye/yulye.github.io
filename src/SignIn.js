import React from 'react';
import Loading from './Loading';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false,
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleResetPassword = this.handleResetPassword.bind(this);
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

  catchError(error) {
    alert(error.message);
    console.log(error);
    this.setState({loading: false});
  }

  firebaseAction(e, type) {
    e.preventDefault();
    if (this.state.loading) return;
    const auth = this.props.firebaseAppAuth;
    const email = this.state.email;
    const password = this.state.password;
    let action;
    if (type === 'password-reset') {
      action = auth.sendPasswordResetEmail(email).then(() => {
	alert('Password reset email sent!');
	this.setState({loading: false});
      });
    } else if (type === 'sign-up') {
      action = auth.createUserWithEmailAndPassword(email, password);
    } else if (type === 'sign-in') {
      action = auth.signInWithEmailAndPassword(email, password);
    }
    action.catch(error => {this.catchError(error)});
    this.setState({loading: true});
  }

  handleResetPassword(e) {
    this.firebaseAction(e, 'password-reset');
  }

  handleSignUp(e) {
    this.firebaseAction(e, 'sign-up');
  }

  handleSubmit(e) {
    this.firebaseAction(e, 'sign-in');
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
	<button onClick={this.handleResetPassword}>Reset Password</button>
	{this.state.loading && <Loading/>}
      </form>
    );
  }
}

export default SignIn;

