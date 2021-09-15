import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Register from '../auth/Register'
import Login from '../auth/Login'
import Home from '../Home'

export class AppRouter extends Component {
  render() {
    return (
      <>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route path="/register" component={ Register } />
          <Route path="/login" component={ Login } />
        </Switch>
      </>
    )
  }
}

export default AppRouter
