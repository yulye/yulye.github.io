import React from 'react';
import Loading from './Loading';
import TicTacToe from './TicTacToe';

class User extends React.Component {
  constructor(props) {
    super(props);
    const user = props.user;
    let name = user.displayName;
    if (!user.displayName) name = user.email;
    this.state = {
      name: name,
      updatingName: false,
      signingOut: false,
    };
    this.handleSignOut = this.handleSignOut.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleUpdateName = this.handleUpdateName.bind(this);
  }

  handleUpdateName(e) {
    if (!this.state.updatingName) {
      const user = this.props.firebaseAppAuth.currentUser;
      user.updateProfile({displayName: this.state.name}).then(() => {
      }).catch(error => {console.log(error)});
    }
    this.setState({updatingName: true});
  }

  handleNameChange(e) {
    this.setState({name: e.target.value});
  }

  handleSignOut(e) {
    if (!this.state.signingOut)
    this.props.firebaseAppAuth.signOut();
    this.setState({
      signedOut: true,
    });
  }

  render() {
    return (
      <div>
	<div>
	  Hi, 
	  <input
	    value={this.state.name}
	    onChange={this.handleNameChange}
	    autoFocus
	  />
	  !
	</div>
	<button onClick={this.handleUpdateName}>Change</button>
	<button onClick={this.handleSignOut}>Sign Out</button>
	<hr/>
	<TicTacToe/>
	{this.state.signedOut && <Loading/>}
      </div>
    );
  }
}

export default User;

