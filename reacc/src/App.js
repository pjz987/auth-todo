import React from 'react'
import Todos from './components/Todos'
import SignUp from './components/SignUp'
import Login from './components/Login'
import NewTodo from './components/NewTodo'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, Redirect
} from 'react-router-dom'
import './App.css'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      todos: [],
      token: '',
      redirectTodos: false
    }
  }

  componentDidMount () {
    // this.handleTestLogin()
  }

  handleLogin = (username, password) => {
    console.log('login')
    const data = { username, password }
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
        this.setState({ token: data.token, redirectTodos: true }, () => {
          console.log(this.state)
          this.handleGetTodos()
        })
      })
  }

  handlePostTodo = (text) => {
    const data = { text }
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

  handleSignUp = (username, password) => {
    fetch('/sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
      .then(res => {
        if (res.status === 201) {
          // this.setState({ redirectTodos: true })
          this.handleLogin(username, password)
        }
      })
  }


  handleComplete = _id => {
    fetch('/remove', {
      method: 'POST',
      headers:  {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`
      },
      body: JSON.stringify({ _id })
    })
      .then(res => {
        if (res.status === 200) this.handleGetTodos()
      })
  }
  
  render () {
    return (
      <Router>
        {this.state.redirectTodos
        ? <Redirect to='/todos' />
        : null}
        <Link to='/sign-up'>Sign Up</Link>
        <Link to='/login/'>Log In</Link>
        <div>
          {/* <button onClick={this.handleTestLogin}>Test Login</button>
          <button onClick={this.handleGetTodos}>Test Get Todos</button>
          <button onClick={this.handlePostTodo}>Test Post Todo</button> */}
        </div>
        <Switch>
          <Route path='/login'>
            <Login onSubmit={this.handleLogin} />
          </Route>
          <Route path='/sign-up'>
            <SignUp onSubmit={this.handleSignUp} />
          </Route>
          <Route path='/todos'>
            <NewTodo onSubmit={this.handlePostTodo} />
            <Todos
              todos={this.state.todos}
              onComplete={this.state.handleComplete}
              onRemove={this.state.handleRemove}
            />
          </Route>
        </Switch>
      </Router>
    )
  }
}
