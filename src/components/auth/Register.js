import React, { Component } from 'react'
import Navbar from '../partials/Navbar'

export class Register extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       pseudo: "",
       email: "",
       pwd: "",
       pwdConfirm: ""
    }
  }

  handlePseudoChange = event => {
    this.setState({ pseudo: event.target.value }, () => {
      console.log(this.state)
    })
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

  handlePwdConfirmChange = event => {
    this.setState({ pwdConfirm: event.target.value }, () => {
      console.log(this.state)
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    console.log('inscription')
  }
  
  render() {
    return (
      <>
        <Navbar />

        <div className="w-50 mx-auto">
          <h2 className="my-3 text-center">Inscription</h2>
          <form method="POST" onSubmit={ this.handleSubmit }>
            <div className="mb-3">
              <label htmlFor="pseudo" className="form-label">Pseudo</label>
              <input type="text" className="form-control" id="pseudo" onChange={ this.handlePseudoChange } />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Adresse email</label>
              <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={ this.handleEmailChange } />
            </div>
            <div className="mb-3">
              <label htmlFor="pwd" className="form-label">Mot de passe</label>
              <input type="password" className="form-control" id="pwd" onChange={ this.handlePwdChange } />
            </div>
            <div className="mb-3">
              <label htmlFor="pwd-confirm" className="form-label">Confirmation du mot de passe</label>
              <input type="password" className="form-control" id="pwd-confirm" onChange={ this.handlePwdConfirmChange } />
            </div>
            <button type="submit" className="btn btn-primary">M'inscrire</button>
          </form>
        </div>
      </>
    )
  }
}

export default Register
