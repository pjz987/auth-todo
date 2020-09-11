import React from 'react'

export default class SignUp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password1: '',
      password2: '',
      noMatch: false,
      noUsername: false,
      // redirect: false
    }
  }

  handleSubmit = evt => {
    evt.preventDefault()
    this.setState({ noMatch: false, noUsername: false })
    if (this.state.password1 !== this.state.password2) {
      this.setState({ noMatch: true })
    } else if (!this.state.username) {
      this.setState({ noUsername: true })
    } else {
      this.props.onSubmit(this.state.username, this.state.password1)
    }
  }

  handleChangeUsername = evt => {
    this.setState({ username: evt.target.value })
  }

  handleChangePassword1 = evt => {
    this.setState({ password1: evt.target.value })
  }

  handleChangePassword2 = evt => {
    this.setState({ password2: evt.target.value })
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor='username'>Username:</label>
        <input name='username' onChange={this.handleChangeUsername} />
        <label htmlFor='password1'>Password:</label>
        <input type='password' name='password1' onChange={this.handleChangePassword1} />
        <label htmlFor='password2'>Re-Enter Password:</label>
        <input type='password' name='password2' onChange={this.handleChangePassword2} />
        <button>Sign Up</button>
        {this.state.noUsername
          ? <div>You must choose a username!</div>
          : null}
        {this.state.noMatch
          ? <div>Passwords must match!</div>
          : null}
      </form>
    )
  }
}
