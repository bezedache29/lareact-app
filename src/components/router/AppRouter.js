import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from '../Home'

export class AppRouter extends Component {
  render() {
    return (
      <>
        <Switch>
          <Route exact path="/" component={ Home } />
        </Switch>
      </>
    )
  }
}

export default AppRouter
