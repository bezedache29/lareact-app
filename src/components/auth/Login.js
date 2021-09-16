import React, { Component } from 'react'
import Navbar from '../partials/Navbar'

export class Login extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       email: "",
       pwd: ""
    }
  }

  handleEmailChange = event => {
    this.setState({ email: event.target.value }, () => {
      console.log(this.state)
    })
  }

  handlePwdChange = event => {
    this.setState({ pwd: event.target.value }, () => {
      console.log(this.state)
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    console.log('connexion')
  }
  
  render() {
    return (
      <>
        <Navbar />

        <div className="w-50 mx-auto">
          <h2 className="my-3 text-center">Connexion</h2>
          <form method="POST" onSubmit={ this.handleSubmit }>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Adresse email</label>
              <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={ this.handleEmailChange } />
            </div>
            <div className="mb-3">
              <label htmlFor="pwd" className="form-label">Mot de passe</label>
              <input type="password" className="form-control" id="pwd" onChange={ this.handlePwdChange } />
            </div>
            <button type="submit" className="btn btn-primary">Me connecter</button>
          </form>
        </div>
      </>
    )
  }
}

export default Login
