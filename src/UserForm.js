import React from 'react';
import compose from 'recompose/compose';
import withState from 'recompose/withState';

const Input = ({ value, onChange, ...props }) =>
  <input
    {...props}
    value={value}
    onChange={event => onChange(event.target.value)}
  />;

const SubmitButton = props =>
  <button {...props}>submit</button>;

const UserForm = ({
  setEmail,
  setPassword,
  email,
  password,
  onSubmit,
}) => (
  <React.Fragment>
      <Input
	placeholder="email"
	value={email}
	onChange={setEmail} />
      <Input
	placeholder="password"
	value={password}
	onChange={setPassword}
	type="password" />
    <SubmitButton onClick={
      () => onSubmit(email, password)
    } />
  </React.Fragment>
);

const withUserFormState = compose(
  withState('email', 'setEmail'),
  withState('password', 'setPassword'),
);

export default withUserFormState(UserForm);
