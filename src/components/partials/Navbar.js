import React, { Component } from 'react'

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

export class Navbar extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }
  
  render() {
    return (
      <>
        <Router>
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">

              <Link to="/" class="navbar-brand">Lareact</Link>

              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>

              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li class="nav-item">
                    <Link tp="/login" class="nav-link">Connection</Link>
                  </li>
                  <li class="nav-item">
                    <Link to="/register" class="nav-link">Inscription</Link>
                  </li>
                </ul>
              </div>

            </div>
          </nav>
        </Router>
      </>
    )
  }
}

export default Navbar
