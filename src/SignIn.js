import React from 'react';
import Loading from './Loading';

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
    this.props.firebaseAppAuth.signInWithEmailAndPassword(
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
	<button>Sign Up</button>
	<button>Reset Password</button>
	{this.state.signingIn && <Loading/>}
      </form>
    );
  }
}

export default SignIn;

