import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Register from '../auth/Register'
import Login from '../auth/Login'
import Home from '../Home'
import CreatePicture from '../pictures/CreatePicture'
import ShowPicture from '../pictures/ShowPicture'

export class AppRouter extends Component {
  render() {
    return (
      <>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route path="/register" component={ Register } />
          <Route path="/login" component={ Login } />
          <Route path="/pictures/create" component={ CreatePicture } />
          <Route path="/pictures/:id" component={ ShowPicture } />
        </Switch>
      </>
    )
  }
}

export default AppRouter
