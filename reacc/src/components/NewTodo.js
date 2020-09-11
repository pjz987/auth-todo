import React from 'react'

export default class NewTodo extends React.Component {
  constructor (props) {
    super(props)
    this.state = { text: '' }
  }

  handleSubmit = evt => {
    this.props.onSubmit(this.state.text)
    evt.preventDefault()
  }

  handleChange = evt => {
    this.setState({ text: evt.target.value })
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <input onChange={this.handleChange} />
        <button>Add Todo</button>
      </form>
    )
  }
}