import React from 'react'

export default function Todos (props) {
  return (
    <ul>
      {props.todos.map(todo => <Todo
        todo={todo}
        key={todo._id}
        onComplete={props.handleComplete}
        onRemove={props.handleRemove}
      />)}
    </ul>
  )
}

class Todo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      todo: props.todo,
    }
  }

  handleComplete = () => {
    this.state.props.onComplete(this.props.todo.key)
  }

  handleRemove = () => {
    this.props.onRemove(this.props.todo.key)
  }

  render () {
    const style = this.props.todo.completed
      ? { textDecoration: 'line-through' }
      : { textDecoration: 'none' }
    return (
      <li>
        <span style={style}>{this.props.todo.text}</span>
        <button onClick={this.handleComplete}>Complete</button>
        <button onClick={this.handleRemove}>Remove</button>
      </li>
    )
  }
}
