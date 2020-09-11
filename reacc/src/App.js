import React from 'react'
import Todos from './components/Todos'
import SignUp from './components/SignUp'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import './App.css'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      todos: [],
      // user_id: '',
      token: ''
    }
  }

  componentDidMount () {
    this.handleTestLogin()
  }

  handleTestLogin = () => {
    const data = { username: 'bobby', password: '123' }
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        // console.log(data.token)
        this.setState({ token: data.token }, () => console.log(this.state))
      })
  }

  handlePostTodo = () => {
    const data = { text: 'todo test' }
    fetch('/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify(data)
    })
      .then(() => this.handleGetTodos())
      // .then(data => console.log(data))
  }

  handleGetTodos = () => {
    fetch('/todos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({ todos: data.todos })
      })
  }

  render () {
    return (
      <Router>
        <div>
          <button onClick={this.handleTestLogin}>Test Login</button>
          <button onClick={this.handleGetTodos}>Test Get Todos</button>
          <button onClick={this.handlePostTodo}>Test Post Todo</button>
          <Todos todos={this.state.todos} />
        </div>
        <Switch>
          <Route path='/login'>
            {/* <Login></Login> */}
          </Route>
          <Route path='/sign-up'>
            <SignUp />
          </Route>
        </Switch>
      </Router>
    )
  }
}
