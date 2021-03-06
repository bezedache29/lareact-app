import React, { Component } from 'react'

import { Link, Redirect } from "react-router-dom"

export class Navbar extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       redirect: false
    }
  }

  logout = () => {
    sessionStorage.removeItem('token')
    this.setState({ redirect: true })
  }
  
  render() {

    if (this.state.redirect) {
      return <Redirect to="/" />
    }

    return (
      <>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">

              <Link to="/" className="navbar-brand">Lareact</Link>

              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  { 
                    sessionStorage.getItem('token') 
                    ?
                    <>
                      <li className="nav-item">
                        <Link to="/pictures/liked-articles" className="nav-link">Voir mes articles likés</Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/pictures/create" className="nav-link">Poster un article</Link>
                      </li>
                      <li className="nav-item">
                        <button className="btn" onClick={ this.logout }>Deconnexion</button>
                      </li>
                    </>
                    :
                    <>
                      <li className="nav-item">
                        <Link to="/login" className="nav-link">Connection</Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/register" className="nav-link">Inscription</Link>
                      </li>
                    </>
                  }
                </ul>
              </div>

            </div>
          </nav>
      </>
    )
  }
}

export default Navbar
