import React from 'react'

export default class SignUp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      // noMatch: false,
      // noUsername: false,
      // redirect: false
    }
  }

  handleSubmit = evt => {
    this.props.onSubmit(this.state.username, this.state.password)
    evt.preventDefault()
  }

  handleChangeUsername = evt => {
    this.setState({ username: evt.target.value })
  }

  handleChangePassword = evt => {
    this.setState({ password: evt.target.value })
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor='username'>Username:</label>
        <input name='username' onChange={this.handleChangeUsername} />
        <label htmlFor='password'>Password:</label>
        <input type='password' name='password' onChange={this.handleChangePassword} />
        <button>Log In</button>
      </form>
    )
  }
}
