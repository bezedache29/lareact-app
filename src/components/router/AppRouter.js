import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Register from '../auth/Register'
import Login from '../auth/Login'
import Home from '../Home'
import CreatePicture from '../pictures/CreatePicture'
import ShowPicture from '../pictures/ShowPicture'
import LikedPicture from '../pictures/LikedPicture'
import Google from '../auth/Google'

export class AppRouter extends Component {
  render() {
    return (
      <>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route path="/register" component={ Register } />
          <Route exact path="/login" component={ Login } />
          <Route path="/pictures/create" component={ CreatePicture } />
          <Route path="/pictures/liked-articles" component={ LikedPicture } />
          <Route path="/pictures/:id" component={ ShowPicture } />
          <Route path="/login/:provider/:token" component={ Google } />
        </Switch>
      </>
    )
  }
}

export default AppRouter
