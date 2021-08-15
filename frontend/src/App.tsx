import React, { useEffect } from 'react'

import CreateMeeting from './meetings/CreateMeeting'
import ListMeeting from './meetings/ListMeeting'
import DetailMeeting from './meetings/DetailMeeting'
import UpdateMeeting from './meetings/UpdateMeeting'

import CreateFruit from './fruits/CreateFruit'
import ListFruit from './fruits/ListFruit'
import DetailFruit from './fruits/DetailFruit'
import UpdateFruit from './fruits/UpdateFruit'

import CreateUser from './users/CreateUser'
import ListUser from './users/ListUser'
import DetailUser from './users/DetailUser'
import UpdateUser from './users/UpdateUser'

import LoginForm from './auth/LoginForm'
import RegisterForm from './auth/RegisterForm'

import { Route, Switch, BrowserRouter as Router, Link } from 'react-router-dom'

import { useQuery } from 'react-query'

import client, { fetchCSRFToken, hasCSRFToken } from './api'

function App() {
  const { data: user } = useQuery('user', () => client.get('/auth/me'), {
    retry: false,
  })

  useEffect(() => {
    if (!hasCSRFToken()) fetchCSRFToken()
  }, [])

  return (
    <Router>
      <nav>
        <ul className='flex'>
          <li>
            <Link to='/'>Home</Link>
            <br />
          </li>

          <li className='ml-10'>
            <Link to='/login'>Login</Link>
            <br />
            <Link to='/register'>Register</Link>
            <br />
          </li>

          <li className='ml-10'>
            <Link to='/meetings'>Meetings</Link>
            <br />
            <Link to='/meetings/create'>Create a Meeting</Link>
            <br />
          </li>

          <li className='ml-10'>
            <Link to='/fruits'>Fruits</Link>
            <br />
            <Link to='/fruits/create'>Create a Fruit</Link>
            <br />
          </li>

          <li className='ml-10'>
            <Link to='/users'>Users</Link>
            <br />
            <Link to='/users/create'>Create a User</Link>
            <br />
          </li>
        </ul>
      </nav>
      <main>
        <Route path='/meetings'>
          <h1>Meetings</h1>
        </Route>

        <Route path='/fruits'>
          <h1>Fruits</h1>
        </Route>

        <Route path='/users'>
          <h1>Users</h1>
        </Route>

        <Switch>
          {/* Meeting routes */}
          <Route path='/meetings/create' component={CreateMeeting} />
          <Route path='/meetings/update/:id' component={UpdateMeeting} />
          <Route path='/meetings/detail/:id' component={DetailMeeting} />
          <Route path='/meetings' component={ListMeeting} />,
          {/* Fruit routes */}
          <Route path='/fruits/create' component={CreateFruit} />
          <Route path='/fruits/update/:id' component={UpdateFruit} />
          <Route path='/fruits/detail/:id' component={DetailFruit} />
          <Route path='/fruits' component={ListFruit} />,{/* User routes */}
          <Route path='/users/create' component={CreateUser} />
          <Route path='/users/update/:id' component={UpdateUser} />
          <Route path='/users/detail/:id' component={DetailUser} />
          <Route path='/users' component={ListUser} />
          {/* auth routes */}
          <Route path='/login' component={LoginForm} />
          <Route path='/register' component={RegisterForm} />
        </Switch>
      </main>
    </Router>
  )
}

export default App
