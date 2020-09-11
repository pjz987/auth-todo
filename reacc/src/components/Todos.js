import React from 'react'

export default function Todos (props) {
  return (
    <ul>
      {props.todos.map(todo => <Todo todo={todo} key={todo._id} />)}
    </ul>
  )
}

function Todo (props) {
  return (
    <li>{props.todo.text}</li>
  )
}
